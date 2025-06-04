import { HomeLayout, HomeSections } from '@/features/home'

/**
 * Home Page
 * 
 * Example implementation of the home feature using the new architecture.
 * This demonstrates how to use the HomeLayout and HomeSections components
 * with automatic loading and error handling.
 */
export default function HomePage() {
  return (
    <HomeLayout>
      <HomeSections />
    </HomeLayout>
  )
}
