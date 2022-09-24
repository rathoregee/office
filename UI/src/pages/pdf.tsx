import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import styles from './Invoice.module.scss'
const Prints = () => (
  <div className={styles.invoice}>
    <div className={`${styles.reportHeader}`}>
      <p>SHORT TERM AGREEMENT FOR FURNISHED APARTMENT</p>
    </div>
    <div>
      <div className={`${styles.valueTable}`}>
        <table>
          <tr>
            <td className={`${styles.topLabel}`}>Reference#</td>
            <td>123456</td>
            <td className={`${styles.topLabel}`}>Date</td>
            <td>11-12-2022</td>
          </tr>
          <tr>
            <td className={`${styles.topLabel}`}>Apartment</td>
            <td colSpan={3}>tlay U14, Room 114, International City, Dubai, UAE</td>
          </tr>
          <tr>
            <td className={`${styles.topLabel}`}>Period</td>
            <td colSpan={3}>10-sep-2022 to 11-12-2022</td>
          </tr>
          <tr>
            <td className={`${styles.topLabel}`}>Rent</td>
            <td>1500 AED</td>
            <td className={`${styles.topLabel}`}>Deposit</td>
            <td>1000 AED</td>
          </tr>
          <tr>
            <td colSpan={4}>
              The agreement is made and entered in this month of SEPTEMBER 2022 between Topline Holiday Homes LLC herein after referred to as “Management Company” & M.              Nationality              PASSPORT NO                                             (Mobile /Whatsapp#  herein after referred to as “Tenant” Whereas Management Company desire to lease this property to Tenant as generally prescribed agreed as follows:
            </td>            
          </tr>
          <tr>
            <td colSpan={4}>
              1.	Security deposit is refundable in seven (07) working days in case of no damage to the property/fixtures.
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
          <tr>
            <td colSpan={4}>
              2.	All the things are in working condition in the apartment. Kindly check all these within 03 working days, after that company is not responsible for any maintenance.
            </td>             
          </tr>
        </table>
      </div>
    </div>
  </div>
);

const print = () => {
  const string = renderToString(<Prints />);
  debugger
  const pdf = new jsPDF("p", "mm", "a4");

  pdf.html(string, {
    callback: function (doc) {
      doc.save();
    },
    x: 5,
    y: 5,
    width: 200, // <- here
    windowWidth: 200 // <- here
  });
};

export const Sample = () => (
  <div>
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
    <button onClick={print}>print</button>
  </div>
);