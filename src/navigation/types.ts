export type RootStackParamList = {
  Main: { screen?: string } | undefined;
  FlashcardReview: {
    cardIds: string[];
    sessionType: 'quick' | 'full';
  };
  SessionSummary: {
    sessionType: 'quick' | 'full';
    weakCardIds: string[];
    totalReviewed: number;
  };
  SOPDetail: { topicId: string };
  ProductDetail: { productId: string };
};

export type TabParamList = {
  Home: undefined;
  SOP: undefined;
  Catalogue: undefined;
};
