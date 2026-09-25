/**
 * Brand Ranking Competitions & Homepage Showcase Service
 * Manages sponsored brand rankings, community voting, and showcase banner
 */

const COMPETITIONS_KEY = 'gomo_brand_competitions';
const SHOWCASE_KEY = 'gomo_brand_showcase';
const USER_VOTES_KEY = 'gomo_brand_user_votes';

const DEFAULT_COMPETITIONS = [];

const DEFAULT_SHOWCASE = null;

function readStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

export const rankingService = {
  async getShowcase() {
    let showcase = readStorage(SHOWCASE_KEY, DEFAULT_SHOWCASE);
    if (showcase?.store_name?.toLowerCase().includes('fabindia')) {
      showcase = null;
    }
    return { success: true, showcase };
  },

  async getOpenCompetitions() {
    let comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    comps = comps.filter(c => 
      !c.title?.toLowerCase().includes('wearables') && 
      !c.description?.toLowerCase().includes('community choice')
    );
    const now = new Date();
    const open = comps.filter(c => {
      if (c.status !== 'open') return false;
      if (c.end_date && new Date(c.end_date) < now) return false;
      return true;
    });
    return { success: true, competitions: open, data: open };
  },

  async getAdminCompetitions() {
    const comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    return { success: true, competitions: comps, data: comps };
  },

  async saveCompetition(payload) {
    const comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    if (payload.competition_id) {
      const idx = comps.findIndex(c => c.competition_id === payload.competition_id);
      if (idx !== -1) {
        comps[idx] = { ...comps[idx], ...payload };
        writeStorage(COMPETITIONS_KEY, comps);
        return { success: true, competition: comps[idx], message: 'Competition updated' };
      }
    }
    const newComp = {
      ...payload,
      competition_id: `comp_${Date.now()}`,
      status: payload.status || 'open',
      created_at: new Date().toISOString(),
      applicants: payload.applicants || []
    };
    comps.unshift(newComp);
    writeStorage(COMPETITIONS_KEY, comps);
    return { success: true, competition: newComp, message: 'Competition created' };
  },

  async deleteCompetition(compId) {
    let comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    comps = comps.filter(c => c.competition_id !== compId);
    writeStorage(COMPETITIONS_KEY, comps);
    return { success: true, message: 'Competition deleted successfully' };
  },

  async declareWinner(compId, winnerSellerId) {
    const comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    const comp = comps.find(c => c.competition_id === compId);
    if (!comp) return { success: false, message: 'Competition not found' };

    const applicant = (comp.applicants || []).find(a => a.seller_id === winnerSellerId);
    if (!applicant) return { success: false, message: 'Applicant not found' };

    const winnerData = {
      seller_id: applicant.seller_id,
      store_name: applicant.store_name || applicant.full_name,
      store_description: applicant.store_description || '',
      store_logo: applicant.store_logo || '',
      total_votes: applicant.votes || 0
    };

    comp.status = 'closed';
    comp.winner = winnerData;
    writeStorage(COMPETITIONS_KEY, comps);

    const showcaseData = {
      competition_id: comp.competition_id,
      title: comp.title,
      ...winnerData
    };
    writeStorage(SHOWCASE_KEY, showcaseData);

    return { success: true, message: 'Winner declared successfully', showcase: showcaseData };
  },

  async vote(compId, sellerId) {
    const comps = readStorage(COMPETITIONS_KEY, DEFAULT_COMPETITIONS);
    const comp = comps.find(c => c.competition_id === compId);
    if (!comp) return { success: false, message: 'Competition not found' };

    const applicant = (comp.applicants || []).find(a => a.seller_id === sellerId);
    if (!applicant) return { success: false, message: 'Brand not found in this competition' };

    applicant.votes = (applicant.votes || 0) + 1;
    writeStorage(COMPETITIONS_KEY, comps);

    // If current showcase is this winner, update vote count as well
    const showcase = readStorage(SHOWCASE_KEY, DEFAULT_SHOWCASE);
    if (showcase && showcase.competition_id === compId && showcase.seller_id === sellerId) {
      showcase.total_votes = applicant.votes;
      writeStorage(SHOWCASE_KEY, showcase);
    }

    return { success: true, message: `Vote recorded for ${applicant.store_name}!` };
  }
};

export default rankingService;
