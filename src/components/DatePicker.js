// CustomDatePicker.js
import {CommonModal, theme} from '@caryaar/components';
import moment from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DateTimePicker, {useDefaultStyles} from 'react-native-ui-datepicker';
// import typography from '../theme/typography';

const DatePicker = ({
  visible = false,
  value = moment(),
  onConfirm,
  onClear,
  onClose,
  minYears = 100,
  maxDate = moment().toDate(),
  minDate = moment().subtract(minYears, 'years').toDate(),
  presentDay = moment().toDate(),
  momentFormat = 'DD/MM/YYYY',
  stopUpdate = false,
  allowFuture = false,
}) => {
  const defaultStyles = useDefaultStyles();

  const finalMaxDate = allowFuture ? undefined : maxDate || moment().toDate();

  const [selectedDate, setSelectedDate] = useState(
    value ? moment(value, momentFormat) : moment(),
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(moment(value, momentFormat)); // FIX: parse correctly
    }
  }, [value, momentFormat]);

  const handleSelect = () => {
    const formattedDate = moment(selectedDate).format(momentFormat);
    onConfirm?.(formattedDate);
    onClose?.();
  };

  const handleClear = () => {
    if (value) {
      setSelectedDate(moment(value, momentFormat));
    }
    // onClear?.();
    onClose?.();
  };

  return (
    <CommonModal
      isVisible={visible}
      onModalHide={handleClear}
      primaryButtonLabel="Select"
      isScrollableContent={false}
      isPrimaryButtonVisible={true}
      showSecondaryButton
      secondaryButtonText="Close"
      onPressPrimaryButton={handleSelect}
      onSecondaryPress={handleClear}
      isTextCenter={false}>
      <View style={styles.wrapper}>
        <DateTimePicker
          mode="single"
          date={selectedDate}
          selected={selectedDate}
          today={presentDay}
          onChange={({date}) => {
            setSelectedDate(moment(date));
          }}
          styles={{
            ...defaultStyles,
            ...datePickerStyles,
          }}
          minDate={minDate}
          maxDate={finalMaxDate}
          weekdaysFormat="min"
          style={styles.datePickerContainer}
          containerHeight={315} // 320
        />
      </View>
    </CommonModal>
  );
};

const datePickerStyles = StyleSheet.create({
  header: {marginBottom: theme.sizes.spacing.smd},
  weekdays: {marginBottom: theme.sizes.spacing.sm},
  today: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    // borderRadius: 50
  }, // Add a border to today's date
  selected: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    // borderRadius: 50,
  },
  selected_label: {
    color: theme.colors.white,
    ...theme.typography.fontStyles.hankenGroteskSemiBold,
  }, //Text style
  selected_year: {
    // Year which is selected
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  year: {
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    color: theme.colors.textPrimary,
  },
  active_year_label: {
    // backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  active_year: {
    // Year which is currently selected by user
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
  },
  selected_month: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  selected_month_label: {
    color: theme.colors.white,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  selected_year_label: {
    color: theme.colors.white,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  day_label: {
    color: theme.colors.textPrimary,
    ...theme.typography.fontStyles.hankenGroteskRegular,
  },
  month_label: {
    color: theme.colors.textPrimary,
    ...theme.typography.fontStyles.hankenGroteskRegular,
  },
  year_label: {
    color: theme.colors.textPrimary,
    ...theme.typography.fontStyles.hankenGroteskRegular,
  },
  weekday_label: {
    color: theme.colors.textPrimary,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  month_selector_label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.body,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  year_selector_label: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSizes.body,
    ...theme.typography.fontStyles.hankenGroteskMedium,
  },
  month: {
    color: theme.colors.textPrimary,
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
  },
  button_next_image: {
    tintColor: theme.colors.textPrimary,
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  button_prev_image: {
    tintColor: theme.colors.textPrimary,
    height: theme.sizes.icons.smd,
    width: theme.sizes.icons.smd,
  },
  today_label: {
    color: theme.colors.textPrimary,
    ...theme.typography.fontStyles.hankenGroteskSemiBold,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    marginBottom: 0,
    paddingBottom: 0,
  },

  datePickerContainer: {
    padding: 0,
    paddingBottom: 0,
    marginBottom: 0,
    margin: 0,
  },
});

export default DatePicker;
