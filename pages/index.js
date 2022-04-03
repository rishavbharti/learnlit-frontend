import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import Layout from 'src/components/Layout';

import BannerImg from 'public/assets/banner.png';
import SectionList from 'src/components/SectionList';

import { interests } from 'src/data/interests';
import Footer from 'src/components/Footer';

export default function Home() {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  const renderSections = () => {
    if (!isAuthenticated) {
      return interests.map((interest, i) => (
        <SectionList interest={interest} key={i} />
      ));
    }

    if (isAuthenticated && profile.interests.length) {
      return profile.interests.map((interest, i) => (
        <SectionList interest={interest} key={i} />
      ));
    }
  };

  return (
    <>
      <Layout>
        <Image src={BannerImg} width={1340} height={460} alt='banner' />
        <div className='px-10 xl:px-0 my-10'>{renderSections()}</div>
      </Layout>
      <Footer />
    </>
  );
}
