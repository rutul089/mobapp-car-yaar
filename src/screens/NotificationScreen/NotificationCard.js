import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Pressable, Spacing, Text} from '../../components';
import theme from '../../theme';

const NotificationCard = ({description, imgSource, subTitle, isLatest}) => {
  return (
    <Pressable style={styles.card}>
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    margin: 8,
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
