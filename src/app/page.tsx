
import Link from 'next/link'
import { Metadata } from 'next'
import Image from "next/image"
import Container from '@/components/container';
import PokeSearcher from '@/app/PokeSearcher';

export const metadata: Metadata = {
  title: 'PokeHelper',
}

function HomePage() {
  return (
    <Container>
      <PokeSearcher />
    </Container>
  )
}

export default HomePage