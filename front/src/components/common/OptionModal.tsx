import {colorHex, colors} from '@/constants';
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
}

export const OptionButton = ({
  label,
  isDanger = false,
  ...props
}: IOptionItem) => {
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
    </Pressable>
  );
};

export const OptionDivider = () => <View style={styles.optionDivider} />;

export const OptionModalTitle = ({children}: PropsWithChildren) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0 0 0 / 0.5)',
    justifyContent: 'flex-end',
  },
  optionContainer: {
    backgroundColor: colors.GRAY_100,
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
    borderBottomColor: colors.GRAY_200,
  },
  optionItemPressed: {
    backgroundColor: colors.GRAY_200,
  },
  optionItemText: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.BLUE_500,
  },
  isDangerOptionText: {
    color: colors.RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export const useOptionModal = () => useContext(OptionModalContext);

export const OptionModal = Object.assign(OptionModalMain, {
  Button: OptionButton,
  Divider: OptionDivider,
  Title: OptionModalTitle,
});
