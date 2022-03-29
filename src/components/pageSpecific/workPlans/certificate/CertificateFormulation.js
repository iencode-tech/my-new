import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "20px",
  },
  roundedBorder: {
    padding: "10px 0 10px 0",
    border: "1.5px",
    borderColor: "#303030",
    borderRadius: "4px",
    minHeight: "75px",
  },
  textH3: {
    display: "block",
    fontSize: "14px",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    lineHeight: 1.2,
  },
  textH6: {
    display: "block",
    fontSize: "10px",
    marginTop: 0,
    marginBottom: "0.8rem",
    fontWeight: 500,
    lineHeight: 1.2,
  },
  column1: {
    float: "left",
    width: "35%",
    padding: "5px",
  },
  column2: {
    float: "left",
    width: "32.5%",
    padding: "5px",
  },
  column3: {
    float: "left",
    width: "32.5%",
    padding: "5px",
  },
  padding: {
    padding: "5px",
  },
  bold: {
    fontWeight: "bold",
  },
});

const CertificateFormulation = ({
  agriculturalPractice,
  rawMaterials,
  trees,
  collaborator,
  observation,
}) => (
  <View>
    <View>
      <Text style={styles.textH3}>Detalle Formulacion utilizada</Text>
    </View>
    <View style={styles.titleContainer}>
      <View style={styles.column1}>
        <Text style={styles.textH6}>Formula: {agriculturalPractice.formulationName}</Text>
        <View style={styles.padding}></View>
        {rawMaterials.map((rawMaterial, index) => (
          <Text key={index} style={styles.textH6}>Material: {rawMaterial.rawMaterial.name}</Text>
        ))}
      </View>
      <View style={styles.column2}>
        <Text style={styles.textH6}>#Arboles: {trees.length}</Text>
        <View style={styles.padding}></View>
        {rawMaterials.map((rawMaterial, index) => (
          <Text key={index} style={styles.textH6}>Dosificacion: {`${rawMaterial.changedQuantity? rawMaterial.changedQuantity : rawMaterial.quantity} ${rawMaterial.unit}`}</Text>
        ))}
      </View>
      <View style={styles.column3}>
        <Text style={styles.textH6}>Dosificador: {collaborator.name}</Text>
      </View>
    </View>
    <View style={styles.roundedBorder}>
      <Text style={styles.bold}>Observation</Text>
      <Text style={styles.textH6}>{observation}</Text>
    </View>
  </View>
);

export default CertificateFormulation;
