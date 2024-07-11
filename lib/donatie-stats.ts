import { stripe } from "./stripe";

let serverKosten = 250
let initializedStats = false

let donatieStats: {
  lastDonations: any[],
  totalDonations: number,
  topDonator: {
    name: string,
    avatar: string
    email: string,
    amount: number
  } & any
} = {
  lastDonations: [],
  totalDonations: 0,
  topDonator: {}
};

const initializeDonatieStats = async () => {

  let payments: any = []
  const startingTime = new Date().getTime()

  try {

    // Fetch donatie statistics
    
    const monthTimeStamp = Math.floor((new Date().getTime() - (60 * 60 * 24 * 30 * 1000)) / 1000)

    await stripe.checkout.sessions.list({limit: 3, created: {
      gte: monthTimeStamp
    }})
      .autoPagingEach(function(payment) {
        if (payment.payment_status === "paid" && payment?.metadata?.discord && payment?.metadata?.products) {
          payments.push({
            amount: payment.amount_total,
            customer: JSON.parse(payment!.metadata!.discord),
            product: JSON.parse(payment!.metadata!.products),
          })
        } 
    });
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de donatie statistieken:', error);
  } finally {
    donatieStats.totalDonations = (payments.reduce((acc: number, cur: any) => acc + cur.amount, 0) / serverKosten) > 100 ? 100 : (payments.reduce((acc: number, cur: any) => acc + cur.amount, 0) / serverKosten)
    donatieStats.lastDonations = payments.slice(0, 3)
    
    // Calculate top donator by adding up all the payments and finding the highest one
    let addingUpPayments: any = {}

    payments.forEach((payment: any) => {
      if (!addingUpPayments[payment.customer.email]) {
        addingUpPayments[payment.customer.email] = 0
      }
      addingUpPayments[payment.customer.email] += payment.amount
    })

    let topDonator: any = {
      customer: "",
      amount: 0
    }

    for (let [key, value] of Object.entries(addingUpPayments)) {
      if (typeof value === 'number' && value > topDonator.amount) {
        const customer = payments.find((payment: any) => payment.customer.email === key)

        topDonator = {
          avatar: customer.customer.image,
          name: customer.customer.name,
          email: customer.customer.email,
          amount: value
        }
      }
    }

    donatieStats.topDonator = topDonator

    initializedStats = true
    console.log(`Fetched donation stats in ${new Date().getTime() - startingTime}ms.`)
  }
};

const fetchDonatieStats = async () => {

  if (initializedStats === false) {
    await initializeDonatieStats()
  }

  return donatieStats
}

export { fetchDonatieStats, donatieStats, initializeDonatieStats };