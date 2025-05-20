import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VehicleImageCard, Text, theme} from '@caryaar/components'; // Adjust path as needed
import {getFileType} from '../utils/documentUtils';

const DocumentGroup = ({
  title,
  documents = [],
  isView,
  isDocument,
  viewImage,
}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.rowSpaceBetween}>
        {documents &&
          documents.map(doc => {
            const fileUri = doc?.docObject?.uri;
            const fileType = getFileType(fileUri);

            return (
              <View key={`${title}-${doc.label}`} style={styles.halfWidth}>
                <VehicleImageCard
                  label={doc.label}
                  image={fileUri}
                  onDeletePress={doc.onDeletePress}
                  viewImage={doc.viewImage}
                  fileType={fileType}
                  isView={isView}
                  btnLabel={'Click to Upload\nImage or PDF'}
                  uploadMedia={doc.uploadMedia}
                  isDocument={isDocument ? fileType !== 'image' : false}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default DocumentGroup;

const styles = StyleSheet.create({
  container: {
    // marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.sizes.spacing.smd,
  },
  halfWidth: {
    width: '48%',
    marginBottom: theme.sizes.spacing.smd,
  },
});
