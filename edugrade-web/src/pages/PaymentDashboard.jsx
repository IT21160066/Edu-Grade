import { Card, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentDashboard = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  console.log(paymentDetails);

  useEffect(() => {
    setIsLoading(true);
    const fetchPayments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/payment-service/checkout/all"
        );
        setPaymentDetails(res.data);
      } catch (err) {
        setError(err.message);
        console.log("Error fetching payments", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filterPayments = paymentDetails.filter((pay) => {
    return pay.name.toLowerCase().includes(filterQuery.toLowerCase());
  });

  const TABLE_HEAD = [
    "User Name",
    "User Email",
    "Course Name",
    "Course Author",
    "Purchased Date",
    "Payment Price",
  ];

  if (error) {
    return (
      <Typography variant="h5" color="red">
        Error Occured : {error}
      </Typography>
    );
  }

  return (
    <Card className="h-full w-full overflow-scroll p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Manage Payments</Typography>
      </div>
      {
        <Input
          type="text"
          label="Search payment here"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      }
      <table className="w-full min-w-max table-auto text-left mt-4">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <Typography>Loading Table Data...</Typography>
              </td>
            </tr>
          ) : (
            filterPayments.map((pay) => (
              <tr key={pay.name}>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {pay.name}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {pay.email}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {pay.courseName}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {pay.author}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {new Date(pay.createdAt).toLocaleDateString()}
                  </Typography>
                </td>
                <td className="border-b border-blue-gray-100 bg-white p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {pay.amount} $
                  </Typography>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default PaymentDashboard;
