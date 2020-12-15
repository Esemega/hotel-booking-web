/**
 * REQUIREMENTS: 
 * - Calculate subtotal: ( nights * price ) + pax
 * - Calculate total: subtotal + IVA
 * 
 * Note: IVA 21%
 */

//Starting data

const bookings = [
  {
    roomType: "standard",
    pax: 1,
    nights: 3,
  },
  {
    roomType: "standard",
    pax: 1,
    nights: 4,
  },
  {
    roomType: "suite",
    pax: 2,
    nights: 1,
  },
  {
    roomType: "standard",
    pax: 2,
    nights: 4,
  },
];

/** *** CASE 1 - PARTICULAR CLIENT ***
*   Room / night (IVA No Incluided):
*        Standard: 100 €.
*        Suite: 150 €.
*    Cargos adicionales:
*        pax +40 € (night price)
*    IVA + 21% (total)
*
* - Class get the bookings list and return subtotal and total
*/

class ParticularClient {
    constructor() {
        this._bookings = [];
        this._subtotal = 0;
        this._total = 0;
    }

    getRoomPrice(roomType) {
        switch (roomType) {
          case "standard":
            return 100;
          case "suite":
            return 150;
        }
        return 1;
    }

    getExtra(pax) {
        return pax > 1 ? (pax - 1 )*40 : 0;
    }

    getIVA() {
        return 1.21;
    }

    calculateSubtotal() {
        this._subtotal = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType) + this.getExtra(pax))),
            0
        );
    }
    
    
    calculateTotal() {
        this._total = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType) + this.getExtra(pax))) * this.getIVA(),
            0
        );
    }

    get total() {
    return this._total.toFixed(2);
    }
    
    get subtotal() {
    return this._subtotal.toFixed(2);
    }

    set bookings(outerBookings) {
    // if bookings is changed all bellow will happend
    this._bookings = outerBookings;
    this.calculateSubtotal(); // subtotal is updated
    this.calculateTotal(); // total is updated
    }
}

const particularClient = new ParticularClient();

particularClient.bookings = bookings;

console.log("*** CLIENTE PARTICULAR ***")
console.log("Subtotal", particularClient.subtotal);
console.log("Total", particularClient.total);

/** *** CASE 2 - TOUR OPERATOR ***
*   Room / night (IVA No Incluided):
*        100€ all rooms
*   Discount:
*        15%
*
* - Class get the bookings list and return subtotal and total
*/

class TourOperator extends ParticularClient {
    getRoomPrice(roomType) {
        switch (roomType) {
          case "standard":
            return 100;
          case "suite":
            return 100;
        }
        return 1;
    }

    getDiscount () {
        return 0.85;
    }

    calculateSubtotal() {
        this._subtotal = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType) + this.getExtra(pax))) * this.getDiscount(),
            0
        );
    }
    
    
    calculateTotal() {
        this._total = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType) + this.getExtra(pax))) * this.getIVA() * this.getDiscount(),
            0
        );
    }
}

const tourOperator = new TourOperator();

tourOperator.bookings = bookings;

console.log("*** TOUR OPERADOR ***")
console.log("Subtotal", tourOperator.subtotal);
console.log("Total", tourOperator.total);

/**
 * CHALLENGE
 * Create a base class and 2 children (particular client & tour operator)
 * On constructor add the rooms price list 
 */

class BookingClass {
    constructor(priceList) {
        this._bookings = [];
        this._priceList = priceList;
        this._subtotal = 0;
        this._total = 0;
    }

    getRoomPrice(roomType, priceList) {
        return priceList[roomType];
    }

    getExtra(pax) {
        return pax > 1 ? (pax - 1 )*40 : 0;
    }

    getIVA() {
        return 1.21;
    }

    getDiscount () {
        return 1;
    }

    calculateSubtotal() {
        this._subtotal = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType, this._priceList) + this.getExtra(pax))) * this.getDiscount(),
            0
        );
    }
    
    
    calculateTotal() {
        this._total = bookings.reduce(
            (acc, { roomType, pax, nights }) => acc + (nights * (this.getRoomPrice(roomType, this._priceList) + this.getExtra(pax))) * this.getIVA() * this.getDiscount(),
            0
        );
    }

    get total() {
    return this._total.toFixed(2);
    }
    
    get subtotal() {
    return this._subtotal.toFixed(2);
    }

    set bookings(outerBookings) {
    // if bookings is changed all bellow will happend
    this._bookings = outerBookings;
    this.calculateSubtotal(); // subtotal is updated
    this.calculateTotal(); // total is updated
    }
}

class ParticularClientFromBookingClass extends BookingClass {
    constructor() {
        super({ 
            "standard": 100,
            "suite": 150
        })
    }
}

class TourOperatorFromBookingClass extends BookingClass {
    constructor() {
        super({
            "standard": 100,
            "suite": 100
        })
    }

    getDiscount () {
        return 0.85;
    }
}

console.log("*****************************")
console.log("**** DESAFIO: Clase base ****")
console.log("*****************************")

const particularClientFromBookingClass = new ParticularClientFromBookingClass();
particularClientFromBookingClass.bookings = bookings;
console.log("*** CLIENTE PARTICULAR ***")
console.log("Subtotal", particularClientFromBookingClass.subtotal);
console.log("Total", particularClientFromBookingClass.total);


const tourOperatorFromBookingClass = new TourOperatorFromBookingClass();
tourOperatorFromBookingClass.bookings = bookings;
console.log("*** TOUR OPERADOR ***")
console.log("Subtotal", tourOperatorFromBookingClass.subtotal);
console.log("Total", tourOperatorFromBookingClass.total);
