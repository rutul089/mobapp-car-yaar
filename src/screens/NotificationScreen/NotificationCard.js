import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Pressable, Spacing, Text} from '../../components';
import theme from '../../theme';

const NotificationCard = ({description, imgSource, subTitle, isLatest}) => {
  return (
    <Card cardContainerStyle={styles.card}>
      <View style={styles.iconContainer}>
        {isLatest ? <View style={styles.latestBadge} /> : null}
        <Image
          resizeMode="contain"
          source={imgSource}
          style={styles.statusIcon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          lineHeight={theme.typography.lineHeights.small}
          hankenGroteskRegular={true}>
          {description}
        </Text>
        <Spacing size={8} />
        <Text
          lineHeight={'caption'}
          size={'caption'}
          color={theme.colors.textLabel}>
          {subTitle}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 10,
  },
  latestBadge: {
    height: 7,
    width: 7,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    right: 6,
  },
  iconContainer: {
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
  },
  textContainer: {
    flex: 1,
  },
});

export default React.memo(NotificationCard);
