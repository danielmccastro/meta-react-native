import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "white",
            flex: 1,
            backgroundColor: selections[index] ? "#495E57" : "gray",
            marginHorizontal: 15,
            marginTop: 20,
          }}
        >
          <View>
            <Text style={{ color: "white", textAlign: "center" }}>
              {section.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  }
});

export default Filters;
