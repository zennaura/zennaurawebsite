import React, { useState } from "react";
import "./ToggleContent.css";
import { useMediaQuery } from "react-responsive";

const ToggleContent = () => {
  // Initial state to track whether the full content is visible
  const [showFullContent, setShowFullContent] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 500 });
  // Summary content (initially shown)
  const summaryContent = (
    <div className="toggle-content-summary">
      <h2>
        Zenn Aura – The Ultimate Destination for Authentic Crystals, Healing
        Candles & Spiritual Tools
      </h2>
      <p>
        <strong>Introduction – Discover the Magic of Zenn Aura</strong>
      </p>
      <p>
        In a world filled with chaos and stress, finding peace, balance, and
        positive energy is more important than ever. At Zenn Aura, we bring you
        a handpicked collection of authentic crystals, crystal bracelets,
        reiki-infused candles, smudging tools, and healing soaps designed to
        help you manifest, cleanse negative energy, and elevate your spiritual
        journey.
      </p>
      <p>
        Each product is handcrafted with love and infused with powerful healing
        energy to support your well-being—whether you seek protection, love,
        wealth, clarity, or relaxation. From Black Tourmaline for protection to
        Rose Quartz for love and Citrine for abundance, our products are
        carefully chosen to help you harness the power of natural healing.
      </p>
      <p>
        <strong>What Makes Zenn Aura Special?</strong>
      </p>
      <p>
        Zenn Aura is more than just a brand—it's a spiritual experience. Unlike
        mass-produced energy products, we focus on quality, authenticity, and
        energy activation to provide you with the best healing tools available.
      </p>
    </div>
  );

  const summaryContentM = (
    <div className="toggle-content-summary">
      <h2>
        Zenn Aura – The Ultimate Destination for Authentic Crystals, Healing
        Candles & Spiritual Tools
      </h2>
      <p>
        <strong>Introduction – Discover the Magic of Zenn Aura</strong>
      </p>
      <p>
        In a world filled with chaos and stress, finding peace, balance, and
        positive energy is more important than ever. At Zenn Aura, we bring you
        a handpicked collection of authentic crystals, crystal bracelets,
        reiki-infused candles, smudging tools, and healing soaps designed to
        help you manifest, cleanse negative energy, and elevate your spiritual
        journey.
      </p>
    </div>
  );
  const fullContentM = (
    <div className="toggle-content-full">
      {summaryContentM} {/* Include the summary content */}
      <p style={{ paddingBottom: "1rem" }}>
        Each product is handcrafted with love and infused with powerful healing
        energy to support your well-being—whether you seek protection, love,
        wealth, clarity, or relaxation. From Black Tourmaline for protection to
        Rose Quartz for love and Citrine for abundance, our products are
        carefully chosen to help you harness the power of natural healing.
      </p>
      <p>
        <strong>What Makes Zenn Aura Special?</strong>
      </p>
      <p>
        Zenn Aura is more than just a brand—it's a spiritual experience. Unlike
        mass-produced energy products, we focus on quality, authenticity, and
        energy activation to provide you with the best healing tools available.
      </p>
      <p>
        <strong>Why Choose Zenn Aura?</strong>
      </p>
      <ul>
        <li>
          100% Natural & Ethically Sourced Crystals – Every crystal and gemstone
          bracelet is hand-selected and genuine
        </li>
        <li>
          Reiki Infused & Energy Charged Products – Our healers cleanse and
          activate each item to enhance its spiritual properties
        </li>
        <li>
          Handmade with Love & Intention – All our candles, soaps, and smudging
          tools are crafted with pure, organic ingredients
        </li>
        <li>
          Designed for Manifestation & Healing – Our products help you attract
          love, abundance, protection, and positivity
        </li>
        <li>
          Perfect for Gifting & Spiritual Rituals – Unique, meaningful gifts for
          birthdays, weddings, or self-care
        </li>
      </ul>
      <p>
        At Zenn Aura, we offer a diverse collection of high-energy products to
        help you elevate your spiritual journey and manifest your desires.
      </p>
      <ol>
        <li>
          <strong>Healing Crystals & Crystal Bracelets</strong>
          <p>
            Our collection of genuine healing crystals and gemstone bracelets is
            perfect for those seeking energy alignment, chakra healing, and
            manifestation. Each crystal has unique properties:
          </p>
          <ul>
            <li>Rose Quartz – Love, self-care, and emotional healing</li>
            <li>Amethyst – Spiritual growth, intuition, and calmness</li>
            <li>
              Black Tourmaline – Protection, grounding, and negative energy
              shielding
            </li>
            <li>Citrine – Wealth, success, and positive energy</li>
            <li>Clear Quartz – Amplifies energy and intention</li>
          </ul>
          <p>
            Wear your crystal bracelet daily or place healing crystals in your
            space to enhance their vibrational power.
          </p>
        </li>
        <li>
          <strong>Reiki-Infused Scented Candles</strong>
          <p>
            Transform your space with our handmade, aromatherapy candles infused
            with essential oils and healing energy. Each candle is designed to
            support different intentions:
          </p>
          <ul>
            <li>
              Love & Romance – Infused with Rose Quartz energy and rose
              essential oil
            </li>
            <li>
              Money & Abundance – Charged with Citrine and prosperity-boosting
              herbs
            </li>
            <li>
              Protection & Cleansing – Contains Black Tourmaline and sage for
              energy purification
            </li>
            <li>
              Relaxation & Meditation – Scented with lavender and chamomile for
              deep relaxation
            </li>
          </ul>
          <p>
            Light these candles during meditation, yoga, or self-care rituals
            for amplified healing effects.
          </p>
        </li>
        <li>
          <strong>Crystal-Infused Handmade Soaps</strong>
          <p>
            Our natural, handmade soaps are infused with healing crystals and
            essential oils to cleanse your skin while elevating your energy.
            Each soap contains a real gemstone, making every bath a ritual of
            self-care and manifestation.
          </p>
          <ul>
            <li>
              Lavender & Amethyst Soap – Perfect for relaxation and spiritual
              clarity
            </li>
            <li>
              Rose & Rose Quartz Soap – A heart-healing formula for love and
              emotional balance
            </li>
            <li>
              Citrus & Citrine Soap – Refreshing and energizing for success and
              abundance
            </li>
            <li>
              Charcoal & Black Tourmaline Soap – Detoxifying and protective for
              removing negativity
            </li>
          </ul>
          <p>
            Use these luxurious soaps daily to cleanse both your body and aura.
          </p>
        </li>
        <li>
          <strong>
            Smudging Tools – Sage, Palo Santo & Energy Cleansing Kits
          </strong>
          <p>
            Purify your home, aura, and surroundings with our sacred smudging
            tools:
          </p>
          <ul>
            <li>
              White Sage Bundles – Clears negative energy and raises vibrations
            </li>
            <li>
              Palo Santo Sticks – Attracts positivity and enhances spiritual
              connection
            </li>
            <li>
              Smudging Kits with Crystals – Combine Sage, Palo Santo, and
              healing stones for a complete energy reset
            </li>
          </ul>
          <p>Perfect for home cleansing, meditation, and rituals.</p>
        </li>
      </ol>
      <p>
        <strong>How Zenn Aura Helps You Manifest & Heal</strong>
      </p>
      <p>At Zenn Aura, our products are designed to support:</p>
      <ul>
        <li>
          Love & Relationships – Strengthen emotional bonds with Rose Quartz and
          Heart Chakra healing
        </li>
        <li>
          Wealth & Abundance – Attract financial success with Citrine and
          manifestation candles
        </li>
        <li>
          Protection & Energy Cleansing – Shield against negativity with Black
          Tourmaline and sage smudging
        </li>
        <li>
          Spiritual Growth & Meditation – Enhance intuition with Amethyst, Clear
          Quartz, and Reiki candles
        </li>
      </ul>
      <p>
        <strong>
          Why Zenn Aura is the Best Place to Buy Crystals & Spiritual Tools?
        </strong>
      </p>
      <ul>
        <li>
          Authentic & Ethically Sourced Crystals – We guarantee real,
          high-quality gemstones
        </li>
        <li>
          Reiki-Energized & Handmade with Love – Our products are cleansed,
          charged, and activated for maximum healing
        </li>
        <li>
          Wide Range of Healing & Manifestation Tools – From crystal bracelets
          to candles and sage, we offer everything you need for spiritual growth
        </li>
        <li>
          Perfect for Gifting – Unique, meaningful spiritual gifts for any
          occasion
        </li>
      </ul>
      <p>
        Whether you're new to crystal healing or a seasoned energy worker, Zenn
        Aura offers the perfect tools to elevate your spiritual journey.
      </p>
    </div>
  );
  // Full content (shown when expanded)
  const fullContent = (
    <div className="toggle-content-full">
      {summaryContent} {/* Include the summary content */}
      <p>
        <strong>Why Choose Zenn Aura?</strong>
      </p>
      <ul>
        <li>
          100% Natural & Ethically Sourced Crystals – Every crystal and gemstone
          bracelet is hand-selected and genuine
        </li>
        <li>
          Reiki Infused & Energy Charged Products – Our healers cleanse and
          activate each item to enhance its spiritual properties
        </li>
        <li>
          Handmade with Love & Intention – All our candles, soaps, and smudging
          tools are crafted with pure, organic ingredients
        </li>
        <li>
          Designed for Manifestation & Healing – Our products help you attract
          love, abundance, protection, and positivity
        </li>
        <li>
          Perfect for Gifting & Spiritual Rituals – Unique, meaningful gifts for
          birthdays, weddings, or self-care
        </li>
      </ul>
      <p>
        At Zenn Aura, we offer a diverse collection of high-energy products to
        help you elevate your spiritual journey and manifest your desires.
      </p>
      <ol>
        <li>
          <strong>Healing Crystals & Crystal Bracelets</strong>
          <p>
            Our collection of genuine healing crystals and gemstone bracelets is
            perfect for those seeking energy alignment, chakra healing, and
            manifestation. Each crystal has unique properties:
          </p>
          <ul>
            <li>Rose Quartz – Love, self-care, and emotional healing</li>
            <li>Amethyst – Spiritual growth, intuition, and calmness</li>
            <li>
              Black Tourmaline – Protection, grounding, and negative energy
              shielding
            </li>
            <li>Citrine – Wealth, success, and positive energy</li>
            <li>Clear Quartz – Amplifies energy and intention</li>
          </ul>
          <p>
            Wear your crystal bracelet daily or place healing crystals in your
            space to enhance their vibrational power.
          </p>
        </li>
        <li>
          <strong>Reiki-Infused Scented Candles</strong>
          <p>
            Transform your space with our handmade, aromatherapy candles infused
            with essential oils and healing energy. Each candle is designed to
            support different intentions:
          </p>
          <ul>
            <li>
              Love & Romance – Infused with Rose Quartz energy and rose
              essential oil
            </li>
            <li>
              Money & Abundance – Charged with Citrine and prosperity-boosting
              herbs
            </li>
            <li>
              Protection & Cleansing – Contains Black Tourmaline and sage for
              energy purification
            </li>
            <li>
              Relaxation & Meditation – Scented with lavender and chamomile for
              deep relaxation
            </li>
          </ul>
          <p>
            Light these candles during meditation, yoga, or self-care rituals
            for amplified healing effects.
          </p>
        </li>
        <li>
          <strong>Crystal-Infused Handmade Soaps</strong>
          <p>
            Our natural, handmade soaps are infused with healing crystals and
            essential oils to cleanse your skin while elevating your energy.
            Each soap contains a real gemstone, making every bath a ritual of
            self-care and manifestation.
          </p>
          <ul>
            <li>
              Lavender & Amethyst Soap – Perfect for relaxation and spiritual
              clarity
            </li>
            <li>
              Rose & Rose Quartz Soap – A heart-healing formula for love and
              emotional balance
            </li>
            <li>
              Citrus & Citrine Soap – Refreshing and energizing for success and
              abundance
            </li>
            <li>
              Charcoal & Black Tourmaline Soap – Detoxifying and protective for
              removing negativity
            </li>
          </ul>
          <p>
            Use these luxurious soaps daily to cleanse both your body and aura.
          </p>
        </li>
        <li>
          <strong>
            Smudging Tools – Sage, Palo Santo & Energy Cleansing Kits
          </strong>
          <p>
            Purify your home, aura, and surroundings with our sacred smudging
            tools:
          </p>
          <ul>
            <li>
              White Sage Bundles – Clears negative energy and raises vibrations
            </li>
            <li>
              Palo Santo Sticks – Attracts positivity and enhances spiritual
              connection
            </li>
            <li>
              Smudging Kits with Crystals – Combine Sage, Palo Santo, and
              healing stones for a complete energy reset
            </li>
          </ul>
          <p>Perfect for home cleansing, meditation, and rituals.</p>
        </li>
      </ol>
      <p>
        <strong>How Zenn Aura Helps You Manifest & Heal</strong>
      </p>
      <p>At Zenn Aura, our products are designed to support:</p>
      <ul>
        <li>
          Love & Relationships – Strengthen emotional bonds with Rose Quartz and
          Heart Chakra healing
        </li>
        <li>
          Wealth & Abundance – Attract financial success with Citrine and
          manifestation candles
        </li>
        <li>
          Protection & Energy Cleansing – Shield against negativity with Black
          Tourmaline and sage smudging
        </li>
        <li>
          Spiritual Growth & Meditation – Enhance intuition with Amethyst, Clear
          Quartz, and Reiki candles
        </li>
      </ul>
      <p>
        <strong>
          Why Zenn Aura is the Best Place to Buy Crystals & Spiritual Tools?
        </strong>
      </p>
      <ul>
        <li>
          Authentic & Ethically Sourced Crystals – We guarantee real,
          high-quality gemstones
        </li>
        <li>
          Reiki-Energized & Handmade with Love – Our products are cleansed,
          charged, and activated for maximum healing
        </li>
        <li>
          Wide Range of Healing & Manifestation Tools – From crystal bracelets
          to candles and sage, we offer everything you need for spiritual growth
        </li>
        <li>
          Perfect for Gifting – Unique, meaningful spiritual gifts for any
          occasion
        </li>
      </ul>
      <p>
        Whether you're new to crystal healing or a seasoned energy worker, Zenn
        Aura offers the perfect tools to elevate your spiritual journey.
      </p>
    </div>
  );

  return (
    <div className="toggle-content-container">
      {/* Show summary or full content based on state */}
      <div className="toggle-content-body">
        {showFullContent
          ? isMobile
            ? fullContentM
            : fullContent
          : isMobile
          ? summaryContentM
          : summaryContent}
      </div>

      {/* Toggle button */}
      <button
        className="toggle-content-button"
        onClick={() => setShowFullContent(!showFullContent)}
      >
        {showFullContent ? "- Read Less" : "+ Read More"}
      </button>
    </div>
  );
};

export default ToggleContent;
