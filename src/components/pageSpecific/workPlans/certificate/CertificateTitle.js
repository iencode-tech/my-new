import React from "react";
import { Text, Image, View, StyleSheet } from "@react-pdf/renderer";
import { utcToLocalTime } from "../../../../utils/timeHelper";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    paddingBottom: "20px",
    borderBottom: "1px",
  },
  logo: {
    width: "50px",
    height: "auto",
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
    width: "40%",
    padding: "5px",
  },
  column3: {
    float: "left",
    width: "25%",
    padding: "5px",
  },
});

const CertificateTitle = ({ zone, sector, terminateDate }) => (
  <View style={styles.titleContainer}>
    <View style={styles.column1}>
      <Image style={styles.logo} src={logo} />
    </View>
    <View style={styles.column2}>
      <Text style={styles.textH3}>AGUACATERA EL CATEO S.A.S</Text>
      <Text style={styles.textH6}>Vereda ovejas. Municipio san vicente</Text>
      <Text style={styles.textH6}>Antioquia-Colombia</Text>
      <Text style={styles.textH6}>www.elcateo.com</Text>
    </View>
    <View style={styles.column3}>
      <Text style={styles.textH6}>OP #: Plagas_confitoraxZona2272020</Text>
      <Text style={styles.textH6}>FECHA: {utcToLocalTime(terminateDate)}</Text>
      {zone && <Text style={styles.textH6}>Zona: {zone.name}</Text>}
      {sector && <Text style={styles.textH6}>Sector: {sector.name}</Text>}
    </View>
  </View>
);

export default CertificateTitle;