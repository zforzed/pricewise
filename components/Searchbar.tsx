'use client'

import { scrapeAndStoreProduct } from '@/lib/actions'
import { useState } from 'react'

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isValidAmazonProductURL = (url:string) => {
    try {
      const parsedURL = new URL(url)
      const hostname = parsedURL.hostname
      if (hostname.includes('amazon.com') ||
          hostname.includes('amazon.') ||
          hostname.endsWith('amazon')) {
            return true
      } 
    } catch (error) { console.log('amazon url validation error: ',error) }

    return false
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const isValidLink = isValidAmazonProductURL(searchPrompt)
    if (!isValidLink) return alert('Please provide a valid Amazon link.')

    try {
      setIsLoading(true)
      const product = await scrapeAndStoreProduct(searchPrompt)
    } catch (error) { 
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form 
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder='Enter product link'
        className='searchbar-input'
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
      />
      <button
        type='submit'
        className='searchbar-btn'
        disabled={searchPrompt===''}
      >
        {isLoading ? 'Searching...': 'Search'}
      </button>
    </form>
  )
}

export default Searchbar