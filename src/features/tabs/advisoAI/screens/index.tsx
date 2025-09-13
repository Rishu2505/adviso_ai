import { IMAGES } from "@/src/assets";
import ANIMATIONS from "@/src/assets/animations";
import { CustomScreenHeader, Input } from "@/src/components";
import { useHaptics } from "@/src/hooks";
import { useRecommendations } from "@/src/hooks/useRecommendations";
import { useGlobalThemedStyles } from "@/src/styles";
import { PromptItem, Recommendation } from "@/src/types/productPost";
import { getCategories } from "@/src/utils/categoryUtils";
import { uniqueByProductName } from "@/src/utils/helper";
import { m, v } from "@/src/utils/metrics";
import { predefinedPrompts } from "@/src/utils/promptsByCategory";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Keyboard, Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from "react-native-reanimated";
import { TypingDots } from "../../home/components";
import { CategoryChips, ListHeader, PromptCard, RecommendationCard } from "../components";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

type FlatListItem =
  | { type: "filters" }
  | { type: "header"; category: string }
  | { type: "prompts"; data: PromptItem[] };

export function AdvisoAI() {
  const globalStyles = useGlobalThemedStyles();
  const styles = useThemedStyles();
  const { selection } = useHaptics();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const { data, loading, error, getRecommendations } = useRecommendations();
  const categories = getCategories();
  const [selected, setSelected] = useState("All");
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);;
  const listRef = useRef<FlashList<FlatListItem>>(null);
  const [showPrompts, setShowPrompts] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowPrompts(true), 500); // after header
    return () => {
      clearTimeout(t1);
    };
  }, []);

  const flatData: FlatListItem[] = useMemo(() => {
    const base: FlatListItem[] = [{ type: "filters" }];

    const filteredData =
      selected === "All"
        ? getCategories().map((category) => ({
          title: category,
          data: predefinedPrompts.filter((p) => p.category === category),
        }))
        : [
          {
            title: selected,
            data: predefinedPrompts.filter((p) => p.category === selected),
          },
        ];

    const mapped = filteredData.flatMap((category) => {
      // ⛔️ Don’t add header if title is "All"
      if (category.title === "All") {
        return [{ type: "prompts", data: uniqueByProductName(category.data) } as FlatListItem];
      }

      return [
        { type: "header", category: category.title } as FlatListItem,
        { type: "prompts", data: uniqueByProductName(category.data) } as FlatListItem,
      ];
    });

    return [...base, ...mapped];
  }, [selected]);



  const scrollToTop = () => {
    if (flatData.length === 0) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  };

  useEffect(() => {
    scrollToTop();
    setRecommendations(data)
  }, [data])

  const handleEnter = (msg: string) => {
    getRecommendations(msg.trim().toLowerCase())
  };

  const inputUI = () => {
    return (
      <Input fontSize={Platform.OS === 'android' ? m(12) : m(12)} value={prompt} onEnter={handleEnter} isAdvisoUI placeHolder={strings.search.placeholder} />
    )
  }

  const header_UIContainer = () => {
    return (
      <CustomScreenHeader
        title={strings.title}
        showRightIcon
        rightIconName="settings"
        onRightPress={() => console.log("right icon pressed")}
      />
    )
  }

  const navigateToAIChat = (params: any) => {
    router.push({
      pathname: "/(common)",
      params: params
    });
  };

  const handlePressRecommendedCard = useCallback((item: any) => {
    let params = { item: JSON.stringify(item) }
    console.log("Recommended card pressed:", params);
    navigateToAIChat(params)
  }, []);

  const handlePressPromptCard = useCallback((item: any) => {
    setPrompt(item?.prompt?.trim())
    setRecommendations([])
    getRecommendations(item?.prompt?.trim().toLowerCase())
  }, []);

  const handleArrowPressPromptCard = useCallback((item: any) => {
    let params = { item: JSON.stringify(item) }
    console.log("Recommended card pressed:", params);
    navigateToAIChat(params)
  }, []);

  const AI_Animation_UIContainer = useCallback(() => {
    return (
      loading &&
      <Animated.View entering={FadeIn.duration(600)} exiting={FadeOut.duration(200)} style={styles.lottieContainer}>
        <LottieView
          source={Platform.OS === "android" ? ANIMATIONS.LOADING_ANIME : ANIMATIONS.AI_ANIMATION}
          autoPlay
          loop
          style={styles.lottie}
        />
        <Animated.Text style={styles.lottieText}>{'Adviso '}
          <TypingDots />
        </Animated.Text>

      </Animated.View>
    )
  }, [loading, styles.lottieContainer, styles.lottie])

  const clearAll = () => {
    recommendations.forEach((item, i) => {
      setTimeout(() => {
        setRecommendations((prev) =>
          prev.filter(r => r.product.description !== item.product.description)
        );
        if (i === recommendations.length - 1) {
          setPrompt('');
          Keyboard.dismiss()
        }
      }, i * 400);
    });
  };

  const recommendationListHeaderUI = React.useMemo(() => (
    recommendations?.length > 0 ?
      <View >
        <ListHeader
          title={strings.recommendations.title}
          showIcon
          isDelete
          onIconPress={() => clearAll()}
          containerStyle={{ marginTop: v(0), }}
        />
      </View>
      :
      <View></View>
  ), [recommendations]);

  const toggleExpand = useCallback((id: string) => {
    selection();
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, [selection]);

  const renderRecommendedItem = useCallback(
    ({ item, index }: { item: Recommendation; index: number }) => (
      <RecommendationCard
        item={item}
        index={index}
        onPress={() => handlePressRecommendedCard(item)}
        expanded={expandedIds.has(item.product.product_name)}
        onToggleExpand={toggleExpand}
      />
    ),
    [expandedIds, toggleExpand, handlePressRecommendedCard]
  );

  useEffect(() => {
    setTimeout(() => {
      Keyboard.dismiss()
    }, 500);
  }, [data])


  const mainListContainerUI = () => {
    return (
      <View style={[styles.innerlistContainer]}>
        <BlurView intensity={10} tint="light" style={styles.blurContainer}></BlurView>
        <FlashList
          data={recommendations}
          estimatedItemSize={1000}
          keyExtractor={(item) => item.product.product_name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recommendationListContainer}
          ListHeaderComponent={recommendationListHeaderUI}
          extraData={expandedIds}
          // ListEmptyComponent={() => (
          //   !loading &&
          //   <Animated.View entering={FadeInDown.duration(800).springify().damping(5).stiffness(120)} style={styles.emptyUI}>
          //     <Image style={styles.sorryAnimation} source={IMAGES.SORRY} />
          //     <Text style={styles.emptyText}>{strings.nothingMatched}</Text>
          //   </Animated.View>
          // )}
          renderItem={renderRecommendedItem}
        />
      </View>
    );
  };

  const welcomeMessageContainerUI = () => {
    return (
      <Animated.View entering={ZoomIn.duration(800).springify().damping(12).stiffness(90)} style={styles.welcomeContentContainer}>
        <Animated.View style={styles.welcomeAnimationContainer}>
          <LottieView
            source={ANIMATIONS.WELCOME}
            autoPlay
            style={styles.lottieWelcome}
          />

        </Animated.View>
        <Animated.Text style={styles.welcomeText}>
          {/* <Animated.Text style={styles.welcomeTextBold}>{strings.hello}
          <Animated.Text>{"Mukesh"}
          </Animated.Text>
          <Animated.Text>{","}
          </Animated.Text>
          </Animated.Text> */}
          <Animated.Text style={styles.welcomeText}>{strings.welcomeContent}
          </Animated.Text>
        </Animated.Text>
      </Animated.View>
    )
  }

  const renderItem = ({ item }: { item: FlatListItem }) => {
    switch (item.type) {
      case "filters":
        return (
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoryChipsListContentContainer}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CategoryChips
                index={index}
                label={item}
                isActive={item === selected}
                onPress={() => setSelected(item)}
              />
            )}
          />
        );

      case "header":
        return (
          <ListHeader
            title={item.category}
            showIcon
            onIconPress={() => console.log("See more for", item.category)}
          />
        );

      case "prompts":
        return (
          <FlatList
            horizontal
            data={item.data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.promptsCardListContentContainer}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PromptCard
                onPress={() =>
                  handlePressPromptCard(item)
                }
                onPressArrow={() =>
                  handleArrowPressPromptCard(item)
                }
                index={index}
                item={item}
              />
            )}
          />
        );

      default:
        return null;
    }
  };


  const predefinedPromptsContainerUI = () => {
    return (
      <Animated.View entering={FadeIn.duration(300)} layout={LinearTransition.springify().damping(15).stiffness(90)} style={[styles.mainlistContainer]}>
        <FlashList
          ref={listRef}
          contentContainerStyle={styles.predefinedPromptsContentContainerUI}
          data={flatData}
          estimatedItemSize={220}
          keyExtractor={(item, index) => {
            if (item.type === "filters") return "filters";
            if (item.type === "header") return `header-${item.category}`;
            if (item.type === "prompts") return `prompt-${index}`;
            return `unknown-${index}`;
          }}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={mainListContainerUI()}
        />
        {loading &&
          <Animated.View entering={FadeIn.duration(600)} exiting={FadeOut.duration(200)} style={styles.predefinedPromptsAnimeContainerUI}>
            <BlurView experimentalBlurMethod="dimezisBlurView" intensity={10} tint="light" style={styles.predefinedPromptsBlurContainerUI}>
            </BlurView>
          </Animated.View>
        }
      </Animated.View>
    )
  }

  return (
    <ImageBackground contentFit={'cover'} source={IMAGES.BG} style={globalStyles.mainContainer}>
      {header_UIContainer()}
      {welcomeMessageContainerUI()}
      {inputUI()}
      {showPrompts && predefinedPromptsContainerUI()}
      {AI_Animation_UIContainer()}
    </ImageBackground>
  );
}
