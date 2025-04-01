import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IOptionModalProps, OptionModal} from '../common/OptionModal';
import {Text} from 'react-native';
import {colorHex, colors, initialMarkerFilter} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAuth from '@/hooks/queries/useAuth';
import {Category} from '@/types/domain';
import {ThemeMode} from '@/types/common';
import useMarkerFilter from '@/hooks/useMarkerFilter';

type CurrentFilter = '색상' | '점수';

const scoreList = [1, 2, 3, 4, 5];

interface MarkerFilterModalProps extends IOptionModalProps {}
const MarkerFilterModal = ({
  handleConfirm,
  ...props
}: MarkerFilterModalProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data ?? {};
  const markerFilter = useMarkerFilter();

  const [mainOptionFilter, setMainOptionFilter] =
    useState<CurrentFilter>('색상');

  const contentRender = () => {
    switch (mainOptionFilter) {
      case '색상':
        return (
          <View style={styles.contentContainer}>
            {Object.entries(categories as Category).map(
              ([color, category], index) => (
                <OptionModal.CheckBox
                  key={index}
                  onPress={() =>
                    markerFilter.set(color as keyof typeof initialMarkerFilter)
                  }
                  checked={
                    markerFilter.filter[
                      color as keyof typeof initialMarkerFilter
                    ]
                  }
                  leadingIcon={
                    <View
                      style={[
                        styles.markerCircle,
                        {backgroundColor: colorHex[color as keyof Category]},
                      ]}
                    />
                  }>
                  {category}
                </OptionModal.CheckBox>
              ),
            )}
          </View>
        );

      case '점수':
        return (
          <View style={styles.contentContainer}>
            {scoreList.map((score, index) => (
              <OptionModal.CheckBox
                key={index}
                onPress={() => {
                  markerFilter.set(
                    score.toString() as keyof typeof initialMarkerFilter,
                  );
                }}
                checked={
                  markerFilter.filter[
                    score.toString() as keyof typeof initialMarkerFilter
                  ]
                }
                leadingIcon={
                  <View
                    style={[
                      styles.markerCircle,
                      {
                        backgroundColor:
                          colorHex[score.toString() as keyof Category],
                      },
                    ]}
                  />
                }>
                {score}점
              </OptionModal.CheckBox>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const handleMainFilter = (option: CurrentFilter) => {
    setMainOptionFilter(option);
  };

  return (
    <OptionModal {...props} btnLabel="완료">
      <OptionModal.Title>
        <Text>마커 필터링</Text>
      </OptionModal.Title>
      <OptionModal.Filter
        selected={mainOptionFilter}
        list={['색상', '점수']}
        handleFilter={handleMainFilter}
      />
      {contentRender()}
    </OptionModal>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    headerContainer: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    filterOptionContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    activedMainOptionFilter: {
      color: colors[theme].BLUE_500,
    },
    contentContainer: {
      paddingHorizontal: 30,
      paddingVertical: 20,
      gap: 10,
    },
    markerContainer: {
      borderRadius: 2,
      paddingVertical: 4,
      paddingHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    pressedMarkerContainer: {
      backgroundColor: colors[theme].GRAY_300,
    },
    checkBoxText: {
      color: colors[theme].BLACK,
      fontSize: 15,
    },
    selectedCheckBoxText: {
      color: colors[theme].BLUE_500,
      fontSize: 15,
      fontWeight: '500',
    },
    markerCircle: {
      width: 16,
      height: 16,
      borderRadius: 16,
    },
  });

export default MarkerFilterModal;
