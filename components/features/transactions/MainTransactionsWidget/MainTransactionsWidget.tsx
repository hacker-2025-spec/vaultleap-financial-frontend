import { ArrowRight, Loader2 } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import MainTransactionWidgetItem from '../MainTransactionsWidgetItem/MainTransactionsWidgetItem'
import { Typography } from '@/components/ui/typography'
import { useNavigate } from '@tanstack/react-router'
import { useInfiniteTransactionItems } from '@/api/transactions/transactionQueries'
import { useEffect, useRef, useState, useCallback } from 'react'

export default function MainTransactionsWidget() {
  const navigate = useNavigate()

  // Fetch transaction items with infinite query (no filtering)
  const {
    transactions: allTransactions,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteTransactionItems({
    limit: 10,
  })

  console.log('hasNextPage', hasNextPage)

  // Ref for scroll container to detect when user scrolls to bottom
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // State for custom scrollbar visibility
  const [showScrollbar, setShowScrollbar] = useState(false)
  const scrollbarTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Function to show scrollbar and reset timeout
  const showScrollbarWithTimeout = useCallback(() => {
    setShowScrollbar(true)

    // Clear existing timeout
    if (scrollbarTimeoutRef.current) {
      clearTimeout(scrollbarTimeoutRef.current)
    }

    // Hide scrollbar after 2.5 seconds of no interaction
    scrollbarTimeoutRef.current = setTimeout(() => {
      setShowScrollbar(false)
    }, 2500)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollbarTimeoutRef.current) {
        clearTimeout(scrollbarTimeoutRef.current)
      }
    }
  }, [])

  // Infinite scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current
    console.log('scrolling', container)

    if (!container) return
    console.log('scrolling')

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50 // 50px threshold
      console.log(scrollTop + clientHeight, scrollHeight - 50, 'scroll')

      console.log('Scroll event:', { scrollTop, scrollHeight, clientHeight, isNearBottom, hasNextPage, isFetchingNextPage })

      // Show scrollbar when user scrolls
      showScrollbarWithTimeout()

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        console.log('Fetching next page...')
        fetchNextPage()
      }
    }

    // Add passive listener for better performance
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, showScrollbarWithTimeout])

  // Handle mouse enter/leave for scrollbar visibility
  const handleMouseEnter = useCallback(() => {
    showScrollbarWithTimeout()
  }, [showScrollbarWithTimeout])

  const handleMouseLeave = useCallback(() => {
    // Don't immediately hide on mouse leave, let the timeout handle it
    // This prevents flickering when moving mouse around
  }, [])

  const handleViewAllClick = () => {
    navigate({ to: '/wallet' })
  }

  // Render different content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2 text-gray-500 h-full w-full">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading transactions...
        </div>
      )
    }

    if (error) {
      return <div className="flex items-center justify-center h-full w-full text-gray-500">No transactions to display</div>
    }

    if (allTransactions.length > 0) {
      return (
        <div className="flex flex-col gap-3 h-full">
          {allTransactions.map((transaction, index) => (
            <div key={`${transaction.hash || transaction.date}-${index}`} data-transaction-item>
              <MainTransactionWidgetItem {...transaction} />
            </div>
          ))}
          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              <span className="ml-2 text-sm text-gray-500">Loading more...</span>
            </div>
          )}
        </div>
      )
    }

    return <div className="flex items-center justify-center h-full w-full text-gray-500">No transactions to display</div>
  }

  return (
    <Card className="w-full sm:min-h-full overflow-hidden flex flex-col pb-2 gap-1 h-[550px] sm:h-auto sm:contain-size">
      <CardHeader className={'px-0 pb-0 flex-shrink-0'}>
        <div className={'px-4'}>
          <Typography variant={'h4'}>Transactions</Typography>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-hidden relative">
        <div
          className={`overflow-y-auto h-full px-2 transition-all duration-300 ease-out ${
            showScrollbar
              ? 'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500'
              : 'scrollbar-none'
          }`}
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            scrollbarWidth: showScrollbar ? 'thin' : 'none',
            msOverflowStyle: showScrollbar ? 'auto' : 'none',
          }}
        >
          <CardContent className="flex flex-col gap-3 px-0">{renderContent()}</CardContent>
        </div>

        {/* Custom scrollbar indicator (optional visual feedback) */}
        {showScrollbar && (
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 bg-gray-400/50 rounded-full opacity-50 pointer-events-none transition-opacity duration-300" />
        )}
      </div>

      <CardFooter className={'py-0 justify-center flex-shrink-0'}>
        <Button variant="ghost" className={'text-primary'} onClick={handleViewAllClick}>
          View All
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}
