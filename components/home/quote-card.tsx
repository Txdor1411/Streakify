import type { Quote } from "@/components/home/types";
import { Sparkles } from "lucide-react-native";
import { Circle, Paragraph, Text, XStack, YStack } from "tamagui";

type QuoteCardProps = {
  quote: Quote;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <YStack
      width={280}
      marginRight={12}
      borderWidth={1}
      borderColor="#E7E5E4"
      borderRadius={20}
      backgroundColor="#FFFEF9"
      padding={14}
    >
      <XStack alignItems="center" justifyContent="space-between" marginBottom={12}>
        <Circle size={30} backgroundColor="#FFEDD5">
          <Sparkles size={14} color="#EA580C" />
        </Circle>
        <XStack backgroundColor="#F4F4F5" borderRadius={999} paddingHorizontal={10} paddingVertical={4}>
          <Text fontSize={11} color="#52525B" fontWeight="600">
            Daily pick
          </Text>
        </XStack>
      </XStack>

      <Paragraph lineHeight={22} fontSize={14} color="#3F3F46">
        "{quote.quote}"
      </Paragraph>

      <Text marginTop={12} fontSize={11} fontWeight="700" color="#71717A">
        {quote.author.toUpperCase()}
      </Text>
    </YStack>
  );
}
