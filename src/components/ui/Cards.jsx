import styled from "styled-components";

export default function StatCard({ value, suffix, title, description }) {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">

          <div>
            <h3 className="value">
              {value}
              {suffix && <span>{suffix}</span>}
            </h3>

            <h4>{title}</h4>
          </div>

          <p className="para">{description}</p>

        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;

  .card {
    position: relative;
    width: 100%;
    transition: all .45s ease;
  }

  .content {
    position: relative;
    background: white;
    border-radius: 22px;
    padding: .8rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    transition: .45s;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items:center;
    
  }

  



  .card:hover .content {
    background: linear-gradient(
      135deg,
      #16a34a,
      #15803d
    );
    color: white;
  }

  

  .value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #0f172a;
    transition: .35s;
    display:flex;
    align-items:center;
  }

  .value span{
    color:#22c55e;
    font-size:2.5rem;
  }

  h4{
    font-size:1.1rem;
    font-weight:700;
    color:#0f172a;
    transition:.35s;
  }

  .para{
    color:#64748b;
    line-height:1.1;
    transition:.35s;
    font-size:.95rem;
  }

  .card:hover .value,
  .card:hover h4,
  .card:hover .para,
  .card:hover .value span{
    color:white;
  }
`;