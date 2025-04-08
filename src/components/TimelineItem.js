import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Text from './Text';

const TimelineItem = ({item, isLast}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftColumn}>
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.circle,
              {backgroundColor: item.completed ? '#007AFF' : '#E0E0E0'},
            ]}
          />
        </View>
        {!isLast && <View style={styles.verticalLine} />}
      </View>
      <TouchableOpacity style={styles.rightColumn}>
        <Text style={styles.title}>{item.title}</Text>
        {item?.date && <Text style={styles.date}>{item.date}</Text>}
        {item.isFinal && item.completed === false && (
          <Text style={styles.closedText}>
            Finance marks the ticket as closed
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  trackingId: {
    fontSize: 14,
    marginBottom: 16,
  },
  highlight: {
    color: '#F69A00',
    fontWeight: '600',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  leftColumn: {
    alignItems: 'center',
    width: 30,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 4,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 4,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#DADADA',
    // marginTop: 2,
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 10,
    borderRadius: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  closedText: {
    color: '#38A169',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 6,
  },
});

export default TimelineItem;
