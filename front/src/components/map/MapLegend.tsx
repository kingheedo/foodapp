import {colorHex, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import {Category} from '@/types/domain';
import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const categoryList = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE'] as const;

const MapLegend = () => {
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data ?? {};
  const insets = useSafeAreaInsets();
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    Object.values(categories as Category).join('') !== '' && (
      <View style={[styles.container, {top: insets.top || 20}]}>
        {categoryList.map((color, index) => {
          return (
            <Fragment key={index}>
              {categories?.[color] !== '' && (
                <View style={styles.column}>
                  <View
                    style={[
                      styles.legendColor,
                      {backgroundColor: colorHex[color]},
                    ]}
                  />
                  <Text style={styles.legendText}>{categories?.[color]}</Text>
                </View>
              )}
            </Fragment>
          );
        })}
      </View>
    )
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 15,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      borderRadius: 10,
      gap: 3,
    },
    column: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendColor: {
      width: 10,
      height: 10,
      borderRadius: 10,
    },
    legendText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontSize: 13,
      fontWeight: '500',
    },
  });

export default MapLegend;
