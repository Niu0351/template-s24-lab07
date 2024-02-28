import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      // Initialize a counter to track the number of cards processed
      let count = 0

      // Function to find the index of the most recent failure
      const indexOfMostRecentFailure = (cardStatus: CardStatus): number => {
        const results = cardStatus.getResults()

        if (results.length > 0 && !results[results.length - 1]) {
          return count++
        }
        return -1
      }

      // Sort the cards by the index of their most recent failure in descending order
      return cards.sort((a, b) => {
        const indexA = indexOfMostRecentFailure(a)
        const indexB = indexOfMostRecentFailure(b)
        return indexB - indexA
      })
    }
  }
}

export { newRecentMistakesFirstSorter }
