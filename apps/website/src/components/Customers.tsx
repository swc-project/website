import customers from "../customers.json";

export default function Customers() {
  return (
    <div className="swc-customers">
      {customers.map((customer, index) => {
        const url = new URL(customer.infoLink);
        url.searchParams.append("utm_source", "swc");
        url.searchParams.append("utm_medium", "customers_page");

        return (
          <a
            href={url.toString()}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={customer.image}
              style={{
                width: customer.width ? `${customer.width}px` : "128px",
                padding: "16px",
              }}
              alt={customer.caption}
              loading="lazy"
            />
          </a>
        );
      })}
    </div>
  );
}
