import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Button from '../../components/atoms/Button';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: 1,
    image: require('../../assets/onBoarding1.png'),
    title: 'Peringatan Automatis\n Untukmu',
    description:
      'Biarkan kami yang mengingat tanggal penting. Notifikasi cerdas akan memastikan kamu tidak pernah melewatkan batas waktu lapor pajak.',
    buttonText: 'Lanjut',
  },
  {
    id: 2,
    image: require('../../assets/onBoarding2.png'),
    title: 'Arsip Digital Aman \n& Terpercaya',
    description:
      'Selamat tinggal kertas berantakan! Kini semua bukti laporan aman, rapi, dan siap diakses langsung dari genggamanmu.',
    buttonText: 'Mulai Sekarang!',
  },
];

const OnBoarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('SignIn');
    }
  };

  const {image, title, description, buttonText} = slides[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Button label={buttonText} onPress={handleNext} />

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
  imageContainer: {
    width: width * 0.8,
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
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
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#FFE9B0',
  },
});
