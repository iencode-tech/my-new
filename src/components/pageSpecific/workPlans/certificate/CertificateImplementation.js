import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    paddingTop: "10px",
    paddingBottom: "10px",
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
  regularRows: {
    flexDirection: "row",
    paddingTop: "5px",
    paddingBottom: "0px",
  },
  column: {
    float: "center",
    width: "16.67%",
    padding: "0 5px 0 5px",
  },
  padding: {
    padding: "5px",
  },
  noVerticalPadding: {
    padding: "0 5px 0 5px",
  },
  bold: {
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center !important",
  },
});

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const CertificateColumn = ({ totalColumns, value = "" }) => (
  <View
    style={{
      ...styles.column,
      ...styles.noVerticalPadding,
      ...styles.textCenter,
      width: `${100 / totalColumns}%`,
    }}
  >
    <Text style={styles.textH6}>{value}</Text>
  </View>
);

const CertificateRow = ({ style, children }) => (
  <View style={style}>{children}</View>
);

const CertificateHeader = ({ headers }) => (
  <View>
    <CertificateRow style={styles.tableContainer}>
      {headers.map((header, index) => (
        <CertificateColumn
          key={index}
          totalColumns={headers.length}
          value={header}
        />
      ))}
    </CertificateRow>
  </View>
);

const CertificateTable = ({ title, headers, values = [] }) => (
  <View style={styles.padding}>
    <Text style={styles.textH3}>{title}</Text>
    <View>
      <CertificateHeader headers={headers} />
      {chunk(values, 2).map((value, index) => (
        <CertificateRow style={styles.regularRows} key={index}>
          {value.map((v) =>
            Object.keys(v).map((subValue, subIndex) => (
              <CertificateColumn
                key={subIndex}
                totalColumns={headers.length}
                value={v[subValue]}
              />
            ))
          )}
        </CertificateRow>
      ))}
    </View>
  </View>
);

const CertificateImplementation = ({ scannedTrees, skippedTrees }) => (
  <>
    <CertificateTable
      title={"Ejecucion en cultivo"}
      headers={[
        "ID_Arbol",
        "Tratamiento",
        "hora",
        "ID_Arbol",
        "Tratamiento",
        "hora",
      ]}
      values={scannedTrees}
    />
    <CertificateTable
      title={"Arboles faltantes"}
      headers={["ID_Arbol", "Tratamiento", "ID_Arbol", "Tratamiento"]}
      values={skippedTrees}
    />
  </>
);

export default CertificateImplementation;
