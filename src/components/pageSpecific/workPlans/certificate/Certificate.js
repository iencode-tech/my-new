import React from "react";
import { Font, Page, Document, StyleSheet } from "@react-pdf/renderer";

import CertificateTitle from "./CertificateTitle";
import CertificateFormulation from "./CertificateFormulation";
import CertificateImplementation from "./CertificateImplementation";
import CertificateStatistics from "./CertificateStatistics";
import { utcToLocalTime } from "../../../../utils/timeHelper";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 20,
    lineHeight: 1.5,
    flexDirection: "column",
    color: "#000000",
  },
});

Font.register({
  family: "Open Sans",
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Italic",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: "Lato Bold",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

function WorkCertificate({ formData }) {
  const scannedTrees = formData.trees
    .filter((tree) => !!tree.scannedOn)
    .map((tree) => ({
      ID_Arbol: tree.treeData.scanId,
      Tratamiento: "Ok",
      hora: utcToLocalTime(tree.scannedOn, "h:mm:ss"),
    }));
  const skippedTrees = formData.trees
    .filter((tree) => !tree.scannedOn)
    .map((tree) => ({
      ID_ARBOL: tree.treeData.scanId,
      Tratamiento: "Faltante",
    }));
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <CertificateTitle
          zone={formData.zone}
          sector={formData.sector}
          terminateDate={formData.terminateOn}
        />
        <CertificateFormulation
          agriculturalPractice={formData.agriculturalPractice}
          rawMaterials={formData.rawMaterials}
          trees={formData.trees}
          collaborator={formData.collaborator}
          observation={formData.observation}
        />
        <CertificateImplementation
          scannedTrees={scannedTrees}
          skippedTrees={skippedTrees}
        />
        <CertificateStatistics
          scannedTrees={scannedTrees.length}
          skippedTrees={skippedTrees.length}
          totalTrees={formData.trees.length}
          assignedOn={formData.assignedOn}
          terminatedOn={formData.terminateOn}
        />
      </Page>
    </Document>
  );
}

export default WorkCertificate;
