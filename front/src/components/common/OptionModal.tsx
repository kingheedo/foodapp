import {colorHex, colors} from '@/constants';
import React, {createContext, PropsWithChildren, useContext} from 'react';
import {
  Modal,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface IOptionModalProps {
  open: boolean;
  handleClose?: () => void;
  handleConfirm?: () => void;
  btnLabel: string;
}

const OptionModalContext = createContext<IOptionModalProps | null>(null);

const OptionModal = ({
  open,
  handleClose,
  handleConfirm,
  btnLabel,
  children,
}: IOptionModalProps & PropsWithChildren) => {
  return (
    <OptionModalContext.Provider value={null}>
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <SafeAreaView style={styles.modalBackground}>
            <Pressable onPress={handleClose}>
              <View style={styles.optionContainer}>
                <View style={styles.pickerContainer}>{children}</View>
              </View>
            </Pressable>
            <View style={styles.optionContainer}>
              <OptionItem
                label={btnLabel}
                color={'BLUE'}
                onPress={handleConfirm ? handleConfirm : handleClose}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </OptionModalContext.Provider>
  );
};

export const OptionList = ({children}: PropsWithChildren) => {
  return children;
};

interface IOptionItem extends PressableProps {
  label: string;
  color: 'RED' | 'BLUE';
}

export const OptionItem = ({label, color, onPress}: IOptionItem) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.optionItem}>
        <Text style={{color: colorHex[color]}}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0 0 0 / 0.5)',
    justifyContent: 'flex-end',
  },
  optionContainer: {
    backgroundColor: colors.WHITE,
    marginBottom: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  pickerContainer: {
    alignItems: 'center',
  },
  optionItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_300,
  },
});
export const useOptionModal = () => useContext(OptionModalContext);

export default OptionModal;
