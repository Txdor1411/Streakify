import type { Story } from "@/components/home/types";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";
import { Circle, Text, YStack } from "tamagui";

type StoryBubbleProps = {
  story: Story;
};

export function StoryBubble({ story }: StoryBubbleProps) {
  return (
    <Pressable>
      <YStack alignItems="center" marginRight={16}>
        <Circle
          size={80}
          borderWidth={2.5}
          borderStyle={story.own ? "dashed" : "solid"}
          borderColor={story.own ? "#D4D4D8" : story.viewed ? "#D4D4D8" : "#FB923C"}
          backgroundColor={story.viewed ? "#F4F4F5" : "#FFF7ED"}
        >
          {story.own ? (
            <Plus size={22} color="#3f3f46" />
          ) : (
            <Circle size={66} backgroundColor={story.viewed ? "#E4E4E7" : "#FED7AA"}>
              <Text fontSize={24} fontWeight="700" color="#3F3F46">
                {story.name.slice(0, 1)}
              </Text>
            </Circle>
          )}
        </Circle>
        <Text marginTop={8} fontSize={12} fontWeight="600" color="#3F3F46">
          {story.name}
        </Text>
      </YStack>
    </Pressable>
  );
}
