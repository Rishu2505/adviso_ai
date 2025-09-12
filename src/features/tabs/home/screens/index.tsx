import { IMAGES } from "@/src/assets";
import exploreData from "@/src/assets/jsons/explore.json";
import trendingData from "@/src/assets/jsons/trending.json";
import { CustomScreenHeader, Input } from "@/src/components";
import { useHaptics } from "@/src/hooks";
import { useGlobalThemedStyles } from "@/src/styles";
import { AI_ProductInfo } from "@/src/types/productPost";
import { v } from "@/src/utils/metrics";
import { FlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { ExploreCard, ListHeader, TrendingCard } from "../components";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";


export function Home() {
  const globalStyles = useGlobalThemedStyles();
  const styles = useThemedStyles();
  const { selection } = useHaptics();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const filteredData = React.useMemo(() => {
    let baseData: any[] = [];
    baseData = trendingData
    if (!searchQuery) return baseData;

    const search = searchQuery.toLowerCase();
    return baseData.filter((item: AI_ProductInfo) => {
      const text = item.text?.toLowerCase() ?? "";
      const name = item.user?.name?.toLowerCase() ?? "";
      return text.includes(search) || name.includes(search);
    });
  }, [searchQuery]);

  const handleEnter = (msg: string) => {
    setSearchQuery(msg.trim().toLowerCase());
  };

  const inputUI = () => {
    return (
      <Input onEnter={handleEnter} />
    )
  }

  const header_UIContainer = () => {
    return (
      <CustomScreenHeader
        title={strings.title}
        showRightIcon
        rightIconName="bell"
        onRightPress={() => console.log("Notification icon pressed")}
      />
    )
  }

  const navigateToAIChat = (params: any) => {
    router.push({
      pathname: "/(common)",
      params: params
    });
  };

  const handlePressExploreCard = useCallback((item: any) => {
    let params = { item: JSON.stringify(item) }
    console.log("Explore card pressed:", params);
    navigateToAIChat(params)
  }, []);

  const handlePressTrendingCard = useCallback((item: any) => {
    let params = { item: JSON.stringify(item) }
    console.log("Trending card pressed:", params);
    navigateToAIChat(params)
  }, []);

  const explores_UIContainer = useCallback(() => {
    return (
      <>
        <ListHeader title={strings.explore.title} style={{ marginTop: v(-16) }} />
        <FlashList
          horizontal
          data={exploreData}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={styles.exploreListContainer}
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
          renderItem={({ item, index }) => (
            <ExploreCard
              index={index}
              title={item.title}
              image={item.image}
              onPress={() => handlePressExploreCard(item)}
            />
          )}
        />
      </>
    )
  }, [styles, handlePressExploreCard])

  const trendingListHeaderUI = React.useMemo(() => (
    <View>
      {explores_UIContainer()}
      <ListHeader
        title={strings.trending.title}
        showIcon
        onIconPress={() => console.log("More pressed")}
      />
    </View>
  ), [explores_UIContainer]);

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

  const renderTrendingItem = useCallback(
    ({ item, index }: { item: AI_ProductInfo; index: number }) => (
      <TrendingCard
        item={item}
        index={index}
        onPress={() => handlePressTrendingCard(item)}
        expanded={expandedIds.has(item.id)}
        onToggleExpand={toggleExpand}
      />
    ),
    [expandedIds, toggleExpand, handlePressTrendingCard]
  );

  const mainListContainerUI = () => {
    return (
      <Animated.View layout={LinearTransition.springify().damping(15).stiffness(90)} style={styles.innerlistContainer}>
        <BlurView intensity={10} tint="light" style={styles.blurContainer}></BlurView>
        <FlashList
          data={filteredData}
          estimatedItemSize={297}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.trendingListContainer}
          ListHeaderComponent={trendingListHeaderUI}
          extraData={expandedIds}
          ListEmptyComponent={() => (
            <Animated.View entering={FadeInDown.duration(800).springify().damping(5).stiffness(120)} style={styles.emptyUI}>
              <Image style={styles.sorryAnimation} source={IMAGES.SORRY} />
              <Text style={styles.emptyText}>{strings.nothingMatched}</Text>
            </Animated.View>
          )}
          renderItem={renderTrendingItem}
        />
      </Animated.View>
    );
  };

  return (
    <ImageBackground contentFit={'cover'} source={IMAGES.BG} style={globalStyles.mainContainer}>
      {header_UIContainer()}
      {inputUI()}
      {mainListContainerUI()}
    </ImageBackground>
  );
}
