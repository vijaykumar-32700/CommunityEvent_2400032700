package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.entity.CommunityEvent;

public interface CommunityEventService {
	public CommunityEvent addCommunityEvent(CommunityEvent event);
	public List<CommunityEvent> displayCommunityEvents();
	public CommunityEvent updateCommunityEvent(Long id, CommunityEvent event);
	public String deleteCommunityEvent(Long id);
}
