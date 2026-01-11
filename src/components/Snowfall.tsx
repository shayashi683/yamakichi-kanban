'use client';

export default function Snowfall() {
  return (
    <div className="snowfall-container">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className={`snowflake snowflake-${i % 10}`} />
      ))}
    </div>
  );
}
