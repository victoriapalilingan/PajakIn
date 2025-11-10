import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Button from '../../components/atoms/Button';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('../../assets/onBoarding1.png'),
    title: 'Peringatan Automatis Untukmu',
    description:
      'Biarkan kami yang mengingat tanggal penting. Notifikasi cerdas akan memastikan kamu tidak pernah melewatkan batas waktu lapor pajak.',
    buttonText: 'Lanjut',
  },
  {
    id: 2,
    image: require('../../assets/onBoarding2.png'),
    title: 'Arsip Digital Aman & Terpercaya',
    description:
      'Selamat tinggal kertas berantakan! Kini semua bukti laporan aman, rapi, dan siap diakses langsung dari genggamanmu.',
    buttonText: 'Mulai Sekarang!',
  },
];

const OnBoarding = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('LoginScreen'); // ganti sesuai nama screen login kamu
    }
  };

  const {image, title, description, buttonText} = slides[currentIndex];

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Button title={buttonText} onPress={handleNext} />

      {/* indikator bulatan */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: width * 586,
    height: 339,
    marginBottom: 40,
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    fontWeight: '700',
    color: '#133126',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#225843',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '700',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  activeDot: {
    backgroundColor: '#FFE9B0',
  },
});
