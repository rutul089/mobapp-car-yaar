// 📁 DatePickerModal.js
import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
} from 'react-native';

const DatePickerModal = ({
  visible,
  onClose,
  onConfirm,
  initialDate = new Date(),
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const [tempDay, setTempDay] = useState(initialDate.getDate());
  const [tempMonth, setTempMonth] = useState(initialDate.getMonth() + 1);
  const [tempYear, setTempYear] = useState(initialDate.getFullYear());
  const [days, setDays] = useState([]);

  const months = Array.from({length: 12}, (_, i) => i + 1);
  const years = Array.from({length: 80}, (_, i) => 1990 + i);

  // 🔁 Auto-adjust days based on month/year
  useEffect(() => {
    const daysInMonth = new Date(tempYear, tempMonth, 0).getDate();
    const newDays = Array.from({length: daysInMonth}, (_, i) => i + 1);
    setDays(newDays);
    if (tempDay > daysInMonth) {
      setTempDay(daysInMonth);
    }
  }, [tempMonth, tempYear]);

  // ✨ Fade animation
  useEffect(() => {
    if (visible) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleConfirm = () => {
    const selectedDate = new Date(tempYear, tempMonth - 1, tempDay);
    onConfirm?.(selectedDate);
  };

  const renderScrollList = (data, selected, onSelect, title) => (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={40}
        decelerationRate="fast"
        style={styles.scrollList}
        contentContainerStyle={{alignItems: 'center'}}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text
              style={[
                styles.listItem,
                item === selected && styles.selectedItem,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.modalTitle}>Select Date</Text>

          <View style={styles.selectorRow}>
            {renderScrollList(days, tempDay, setTempDay, 'Day')}
            {renderScrollList(months, tempMonth, setTempMonth, 'Month')}
            {renderScrollList(years, tempYear, setTempYear, 'Year')}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.okButton]}
              onPress={handleConfirm}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  selectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listTitle: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
  },
  scrollList: {
    height: 150,
  },
  listItem: {
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 16,
    color: '#555',
  },
  selectedItem: {
    color: '#fff',
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    overflow: 'hidden',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  okButton: {
    backgroundColor: '#6C63FF',
  },
  cancelText: {
    color: '#333',
  },
  okText: {
    color: '#fff',
    fontWeight: '600',
  },
});

//  <DatePickerModal
//         visible={showPicker}
//         onClose={() => setShowPicker(false)}
//         onConfirm={handleConfirm}
//         initialDate={selectedDate || new Date()}
//       />
