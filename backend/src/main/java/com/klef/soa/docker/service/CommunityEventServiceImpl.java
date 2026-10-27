package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.soa.docker.entity.CommunityEvent;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.CommunityEventRepository;

@Service
public class CommunityEventServiceImpl implements CommunityEventService {

	@Autowired
	private CommunityEventRepository repository;

	@Override
	public CommunityEvent addCommunityEvent(CommunityEvent event) {
		CommunityEvent newEvent = new CommunityEvent();
		newEvent.setEventName(event.getEventName());
		newEvent.setVenue(event.getVenue());
		newEvent.setAttendeeCount(event.getAttendeeCount());
		newEvent.setCompleted(event.getCompleted());
		return repository.save(newEvent);
	}

	@Override
	public String deleteCommunityEvent(Long id) {
		Optional<CommunityEvent> optionalEvent = repository.findById(id);
		if (optionalEvent.isPresent()) {
			CommunityEvent event = optionalEvent.get();
			repository.delete(event);
			return "Community Event Deleted Successfully";
		} else {
			return "Community Event Id Not Found to Delete";
		}
	}

	@Override
	public CommunityEvent updateCommunityEvent(Long id, CommunityEvent event) {
		CommunityEvent existingEvent = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Community Event not found with id : " + id));
		existingEvent.setEventName(event.getEventName());
		existingEvent.setVenue(event.getVenue());
		existingEvent.setAttendeeCount(event.getAttendeeCount());
		existingEvent.setCompleted(event.getCompleted());
		return repository.save(existingEvent);
	}

	@Override
	public List<CommunityEvent> displayCommunityEvents() {
		return repository.findAll();
	}
}
