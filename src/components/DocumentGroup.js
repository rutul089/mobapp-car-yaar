import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VehicleImageCard from '@caryaar/components'; // Adjust path as needed
import {getFileType} from '../utils/documentUtils';

const DocumentGroup = ({title, documents = [], isView, isDocument}) => {
  if (!documents.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        {documents.map(doc => {
          const fileUri = doc?.docObject?.uri;
          const fileType = getFileType(fileUri);

          return (
            <View key={`${title}-${doc.label}`} style={styles.item}>
              <VehicleImageCard
                label={doc.label}
                image={fileUri}
                onDeletePress={doc.onDeletePress}
                viewImage={doc.viewImage}
                fileType={fileType}
                isView={isView}
                btnLabel={'Click to Upload\nImage or PDF'}
                uploadMedia={doc.uploadMedia}
                isDocument={isDocument}
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
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 12,
  },
});
