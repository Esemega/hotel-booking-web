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

 /** *** CASE 2 - TOUR OPERATOR ***
*   Room / night (IVA No Incluided):
*        100€ all rooms
*   Cargos adicionales:
*        pax +40 € (night price)
*   Discount:
        15%
*    IVA + 21% (total)
*
* - Class get the bookings list and return subtotal and total
 */