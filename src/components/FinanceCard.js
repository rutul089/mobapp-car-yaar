import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import images from '../assets/images';

const FinanceCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Lowest Interest</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={images.placeholder_image} // Replace with your local asset
          style={styles.logo}
        />
        <View style={{flex: 1}}>
          <Text style={styles.name}>Fortune Finance</Text>
          <Text style={styles.rate}>8.96%</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Tenure</Text>
          <Text style={styles.value}>60 Months</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>EMI</Text>
          <Text style={styles.value}>₹11,093</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Processing Fee</Text>
          <Text style={styles.value}>₹1,000</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    // marginHorizontal: 16,
    marginTop: 16,
    elevation: 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -12,
    left: -12,
    backgroundColor: '#E0ECFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  rate: {
    fontSize: 14,
    color: '#3B82F6',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#9CA3AF',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
});

export default FinanceCard;
