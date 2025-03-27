import React, {createContext, PropsWithChildren, useContext} from 'react';
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

interface IOptionModalProps extends ModalProps {
  open: boolean;
  handleClose?: () => void;
  handleConfirm?: () => void;
  btnLabel: string;
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
            <Pressable onPress={handleClose}>
              <View style={styles.optionContainer}>{children}</View>
            </Pressable>
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

interface IOptionItem extends PressableProps {
  label: string;
  isDanger?: boolean;
  isChecked?: boolean;
}

export const OptionButton = ({
  label,
  isDanger = false,
  isChecked = false,
  ...props
}: IOptionItem) => {
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
        {label}
      </Text>
      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500} />
      )}
    </Pressable>
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
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{children}</Text>
  </View>;
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
  });

export const useOptionModal = () => useContext(OptionModalContext);

export const OptionModal = Object.assign(OptionModalMain, {
  Button: OptionButton,
  Divider: OptionDivider,
  Title: OptionModalTitle,
});
