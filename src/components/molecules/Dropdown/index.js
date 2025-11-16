import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DownButtonIcon from '../../../assets/downbutton.svg';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TouchableOpacity
        style={styles.dropdownWrapper}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}>
        <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <View style={[styles.iconWrapper, isOpen && styles.iconRotated]}>
          <DownButtonIcon width={20} height={20} />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.dropdownItem,
                index === 0 && styles.dropdownItemFirst,
                index === options.length - 1 && styles.dropdownItemLast,
              ]}
              onPress={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}>
              {option.icon && (
                <View style={styles.optionIcon}>{option.icon}</View>
              )}
              <Text style={styles.dropdownItemText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: 13,
    color: '#2A6E53',
    marginBottom: 6,
    fontFamily: 'Montserrat-Medium',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 12,
    height: 54,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: '#020202',
    fontFamily: 'Montserrat-Regular',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  iconWrapper: {
    marginLeft: 8,
    transition: 'transform 0.3s',
  },
  iconRotated: {
    transform: [{rotate: '180deg'}],
  },
  dropdownList: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: -26,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  optionIcon: {
    marginRight: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#020202',
    fontFamily: 'Montserrat-Regular',
  },
});
