import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <p className="nf-code">404</p>
      <h1>Page not found · الصفحة غير موجودة</h1>
      <div className="nf-links">
        <Link className="btn btn-primary" href="/en">Home</Link>
        <Link className="btn btn-outline" href="/ar">الرئيسية</Link>
      </div>
    </main>
  );
}
