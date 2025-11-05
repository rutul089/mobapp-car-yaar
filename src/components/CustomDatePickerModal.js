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
  disablePastDates = false, // disables past dates
  restProps,
}) => {
  const [date, setDate] = useState(initialDate);

  // 🔧 Update internal state whenever parent updates `initialDate`
  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  // 🔧 Prevent selecting future dates (optional)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validRange = disableFutureDates
    ? {endDate: today} // only past and today allowed
    : disablePastDates
      ? {startDate: today} // only today and future allowed
      : undefined;

  // const validRange = disableFutureDates
  //   ? {
  //       endDate: new Date(
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate(),
  //       ),
  //     }
  //   : undefined;

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
      {...restProps}
    />
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
