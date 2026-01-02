import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../ThemeProvider";

export default function Statistics() {
  const { dark } = useTheme();
  const bg = dark ? "#05060a" : "#e0e1dd";
  const textColor = dark ? "#e0e1dd" : "#0d1b2a";

  return (
    <ScrollView contentContainerStyle={[styles.Scrollcontent, { backgroundColor: bg }]}>
      <View style={[styles.Statistics, { backgroundColor: bg }]}>

        <Text style={{ color: textColor, fontSize: 25, fontWeight: "bold" }}>
          Statistics screen
          In today’s world, social media has become one of the most powerful tools of communication, information, and entertainment. Platforms such as Instagram, TikTok, Snapchat, Facebook, and X (formerly Twitter) have changed the way people interact, share ideas, and even perceive the world around them. While social media brings many advantages, it also comes with certain risks and challenges that affect individuals and society as a whole.

One of the biggest benefits of social media is its ability to connect people from all over the world. It allows users to stay in touch with friends and family, even if they live thousands of kilometers apart. It also helps people discover new cultures, learn new languages, and exchange experiences. For students and professionals, social media can be a valuable tool for learning and networking, providing access to educational resources, job opportunities, and global communities.

Social media has also become a platform for self-expression and creativity. People can share their art, music, opinions, and talents with a global audience. Influencers and content creators have turned social platforms into careers, shaping trends and inspiring millions of followers. Businesses also use social media to promote their products, engage with customers, and build brand awareness. In this way, social media has transformed marketing and the economy itself.

However, despite all these positive aspects, social media also has a dark side. Many people, especially teenagers, spend too much time online, which can lead to addiction, poor concentration, and mental health issues such as anxiety, loneliness, or depression. The pressure to look perfect or have a “successful” life can make users compare themselves to others, damaging their self-esteem. Moreover, the spread of misinformation, cyberbullying, and privacy concerns are major problems that society must face.

In addition, social media has a strong influence on politics and public opinion. While it allows people to express their views and organize social movements, it can also spread fake news or hate speech. Algorithms often show users content that confirms their beliefs, creating so-called “echo chambers,” where people are exposed only to opinions similar to their own.

In conclusion, social media is a double-edged sword. It can be an incredible tool for communication, learning, and creativity, but it can also be harmful if used irresponsibly. The key is balance — using social media to connect and grow, without letting it control our lives. As society continues to evolve in the digital age, understanding and managing the impact of social media is one of the greatest challenges of our time.
        </Text>
      </View>
    </ScrollView>
  );
}
const styles= StyleSheet.create({
  Statistics:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Scrollcontent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  }
});