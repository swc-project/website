import customers from "../customers.json";

export default function Customers() {
  const showcase = customers.map((customer, index) => {
    const url = new URL(customer.infoLink);
    url.searchParams.append("utm_source", "swc");
    url.searchParams.append("utm_medium", "customers_page");

    return (
      <a href={url.toString()} key={index}>
        <img
          src={customer.image}
          style={{
            width: customer.width ? `${customer.width}px` : "128px",
            padding: "16px",
          }}
          alt={customer.caption}
        />
      </a>
    );
  });
  return (
    <div className={"flex items-center flex-wrap justify-center gap-6"}>
      {showcase}
    </div>
  );
}
