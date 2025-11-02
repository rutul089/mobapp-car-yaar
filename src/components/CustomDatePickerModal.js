// import React, {useEffect, useState} from 'react';
// import {View, StyleSheet, Image} from 'react-native';
// import {DatePickerModal} from 'react-native-paper-dates';

// import {images} from '@caryaar/components';

// const CustomDatePickerModal = ({
//   visible,
//   onDismiss,
//   onConfirm,
//   initialDate = new Date(),
//   title = 'Select a date',
//   mode = 'single', // "single", "range", "multiple"
//   confirmLabel = 'Confirm',
//   dismissLabel = 'Cancel',
//   restProps,
// }) => {
//   const [date, setDate] = useState(initialDate);
//   console.log('initialDate', initialDate);

//   useEffect(() => {
//     const [date, setDate] = useState(initialDate);
//   }, [initialDate]);

//   const today = new Date();
//   const endOfToday = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     today.getDate(),
//   );

//   const handleConfirm = params => {
//     if (mode === 'single') {
//       setDate(params.date);
//       onConfirm?.(params.date);
//     } else if (mode === 'range') {
//       onConfirm?.(params.startDate, params.endDate);
//     }
//     onDismiss?.();
//   };

//   return (
//     <View style={styles.container}>
//       <DatePickerModal
//         mode={mode}
//         visible={visible}
//         date={date}
//         onDismiss={onDismiss}
//         onConfirm={handleConfirm}
//         locale="en"
//         saveLabel={confirmLabel}
//         label={title}
//         {...restProps}

//         // validRange={{endDate: endOfToday}}

//         // validRange={{
//         //   startDate: new Date(2000, 0, 1),
//         //   endDate: endOfToday, // till today
//         // }}
//       />
//     </View>
//   );
// };

// export default CustomDatePickerModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DatePickerModal} from 'react-native-paper-dates';

const CustomDatePickerModal = ({
  visible,
  onDismiss,
  onConfirm,
  initialDate = new Date(),
  title = 'Select a date',
  mode = 'single', // "single", "range", "multiple"
  confirmLabel = 'Confirm',
  dismissLabel = 'Cancel',
  disableFutureDates = false, // custom prop
}) => {
  const [date, setDate] = useState(initialDate);

  // 🔧 Update internal state whenever parent updates `initialDate`
  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  // 🔧 Prevent selecting future dates (optional)
  const today = new Date();
  const validRange = disableFutureDates
    ? {
        endDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        ),
      }
    : undefined;

  const handleConfirm = params => {
    if (mode === 'single') {
      // ✅ Strip timezone offset to avoid -1 day shift
      const selectedDate = new Date(
        params.date.getFullYear(),
        params.date.getMonth(),
        params.date.getDate(),
      );
      setDate(selectedDate);
      onConfirm?.(selectedDate);
    } else if (mode === 'range') {
      onConfirm?.(params.startDate, params.endDate);
    }
    onDismiss?.();
  };

  return (
    <View style={styles.container}>
      <DatePickerModal
        mode={mode}
        visible={visible}
        date={date}
        onDismiss={onDismiss}
        onConfirm={handleConfirm}
        locale="en"
        saveLabel={confirmLabel}
        label={title}
        validRange={validRange}
      />
    </View>
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
