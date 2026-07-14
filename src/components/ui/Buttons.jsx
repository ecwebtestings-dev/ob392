import styled from "styled-components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function AnimatedButton({
  href = "#",
  children,
  color = "#22c55e",
  icon = true,
}) {
  return (
    <StyledWrapper $color={color}>
      <a href={href} className="animated-btn">
        <span>{children}</span>

        {icon && <ArrowRightIcon className="icon" />}
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .animated-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;

    padding: 0.95rem 2rem;

    border: 2px solid ${(props) => props.$color};
    border-radius: 12px;

    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;

    color: ${(props) => props.$color};

    background: transparent;

    overflow: hidden;

    transition: all 0.4s ease;

    box-shadow: inset 0 0 0 0 ${(props) => props.$color};
  }

  .animated-btn:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 ${(props) => props.$color};
    transform: translateY(-2px);
  }

  .animated-btn:active {
    transform: scale(0.96);
  }

  .icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .animated-btn:hover .icon {
    transform: translateX(5px);
  }
`;