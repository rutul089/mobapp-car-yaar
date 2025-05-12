import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Text} from '@caryaar/components';

const PaginationFooter = ({
  loadingMore,
  loading,
  currentPage,
  totalPages,
  footerMessage,
  minTotalPagesToShowMessage = 1,
}) => {
  if (loadingMore) {
    return <ActivityIndicator style={styles.indicator} />;
  }

  const allLoaded =
    !loading &&
    currentPage >= totalPages &&
    totalPages > minTotalPagesToShowMessage;

  if (allLoaded) {
    return (
      <Text type="helper-text" style={styles.text}>
        {footerMessage}
      </Text>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  indicator: {
    marginVertical: 16,
  },
  text: {
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default React.memo(PaginationFooter);
