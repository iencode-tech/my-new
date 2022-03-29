import React from "react";
import { Text, Image, View, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";
import { utcToLocalTime } from "../../../../utils/timeHelper";

const signature = `data:image/png;base64,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`;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "20px",
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
    marginBottom: "0.5rem",
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
  verticalPadding: {
    padding: "10px 0 10px 0",
  },
  bold: {
    fontWeight: "bold",
  },
  signature: {
    width: "85px",
    height: "auto",
  },
});

const CertificateStatistics = ({scannedTrees, skippedTrees, totalTrees, assignedOn, terminatedOn}) => (
  <View>
    <View>
      <Text style={styles.textH3}>Estadisticas</Text>
    </View>
    <View style={styles.titleContainer}>
      <View style={styles.column1}>
        <Text style={styles.textH6}># Arboles tratados: {scannedTrees}</Text>
        <Text style={styles.textH6}>Hora inicio: {utcToLocalTime(assignedOn)}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={styles.textH6}># Arboles no tratados: {skippedTrees}</Text>
        <Text style={styles.textH6}>Hora fin: {utcToLocalTime(terminatedOn)}</Text>
      </View>
      <View style={styles.column3}>
        <Text style={styles.textH6}># Tofal Arboles: {totalTrees}</Text>
        <Text style={styles.textH6}>Tiempo en campo: {moment(terminatedOn).diff(moment(assignedOn), "hours")}</Text>
      </View>
    </View>
    <View style={styles.roundedBorder}>
      <Image style={styles.signature} src={signature} />
      <Text style={styles.textH6}>
        Firma certificacion del lider de cultivo
      </Text>
    </View>
  </View>
);

export default CertificateStatistics;
