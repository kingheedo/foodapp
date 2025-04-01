import React, {
  createContext,
  Fragment,
  PropsWithChildren,
  useContext,
} from 'react';
import {
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';

export interface IOptionModalProps extends ModalProps {
  open: boolean;
  handleClose?: () => void;
  handleConfirm?: (...ars: any[]) => void;
  btnLabel?: string;
}

const OptionModalContext = createContext<null>(null);

const OptionModalMain = ({
  open,
  handleClose,
  handleConfirm,
  btnLabel,
  children,
  ...props
}: IOptionModalProps & PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <OptionModalContext.Provider value={null}>
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
        {...props}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <SafeAreaView style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.optionContainer}>{children}</View>
            </TouchableWithoutFeedback>
            <View style={styles.optionContainer}>
              <OptionButton
                label={btnLabel}
                onPress={handleConfirm ?? handleClose}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </OptionModalContext.Provider>
  );
};

export const OptionDivider = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return <View style={styles.optionDivider} />;
};

export const OptionModalTitle = ({children}: PropsWithChildren) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

interface IOptionItemProps extends PressableProps {
  label?: string;
  isDanger?: boolean;
  isChecked?: boolean;
}

export const OptionButton = ({
  label,
  isDanger = false,
  isChecked = false,
  ...props
}: IOptionItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.optionItem,
        pressed && styles.optionItemPressed,
      ]}
      {...props}>
      <Text
        style={[styles.optionItemText, isDanger && styles.isDangerOptionText]}>
        {label || '완료'}
      </Text>
      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500} />
      )}
    </Pressable>
  );
};

interface IOptionFilterProps<T> {
  selected: T;
  list: T[];
  handleFilter: (option: T) => void;
}

const OptionFilter = <T,>({
  selected,
  list,
  handleFilter,
}: IOptionFilterProps<T>) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Fragment>
      <OptionModal.Divider />
      <View style={styles.optionFilterContainer}>
        {list.map((filter, index) => (
          <Pressable
            key={index}
            style={styles.optionFilterButton}
            onPress={() => handleFilter(filter)}>
            <Text style={selected === filter && styles.optionFilterActive}>
              {String(filter)}
            </Text>
            <Ionicons
              name="chevron-down-sharp"
              color={
                selected === filter && styles.optionFilterActive
                  ? colors[theme].BLUE_500
                  : colors[theme].GRAY_300
              }
              size={25}
            />
          </Pressable>
        ))}
      </View>
      <OptionModal.Divider />
    </Fragment>
  );
};

interface IOptionCheckBoxProps extends PressableProps {
  checked?: boolean;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
}

const OptionCheckBox = ({
  checked = false,
  leadingIcon = null,
  children,
  ...props
}: IOptionCheckBoxProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        styles.checkboxContainer,
        pressed && styles.pressedCheckboxContainer,
      ]}
      {...props}>
      <Ionicons
        name="checkmark-circle-outline"
        size={16}
        style={{
          backgroundColor: checked
            ? colors[theme].BLUE_500
            : colors[theme].WHITE,
          borderRadius: 16,
        }}
        color={checked ? colors[theme].WHITE : colors[theme].BLUE_500}
      />
      {leadingIcon}
      <Text style={styles.checkBoxText}>{children}</Text>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0 0 0 / 0.5)',
      justifyContent: 'flex-end',
    },
    optionContainer: {
      backgroundColor: colors[theme].GRAY_100,
      marginBottom: 10,
      borderRadius: 15,
      marginHorizontal: 10,
      overflow: 'hidden',
    },
    optionItem: {
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    optionDivider: {
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors[theme].GRAY_200,
    },
    optionItemPressed: {
      backgroundColor: colors[theme].GRAY_200,
    },
    optionItemText: {
      fontSize: 17,
      fontWeight: '500',
      color: colors[theme].BLUE_500,
    },
    isDangerOptionText: {
      color: colors[theme].RED_500,
    },
    titleContainer: {
      alignItems: 'center',
      padding: 15,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors[theme].BLACK,
    },
    optionFilterContainer: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    optionFilterButton: {
      flexDirection: 'row',
      gap: 5,
    },
    optionFilterActive: {
      color: colors[theme].BLUE_500,
    },
    checkboxContainer: {
      borderRadius: 2,
      paddingVertical: 4,
      paddingHorizontal: 5,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    pressedCheckboxContainer: {
      backgroundColor: colors[theme].GRAY_300,
    },
    checkBoxText: {
      color: colors[theme].BLACK,
      fontSize: 15,
    },
  });

export const useOptionModal = () => useContext(OptionModalContext);

export const OptionModal = Object.assign(OptionModalMain, {
  Button: OptionButton,
  Divider: OptionDivider,
  Title: OptionModalTitle,
  Filter: OptionFilter,
  CheckBox: OptionCheckBox,
});
