package com.project2.convert;

import com.project2.entities.data.MotelRoom;
import com.project2.entities.data.Report;
import com.project2.entities.data.Tenant;
import com.project2.entities.dto.MotelRoomDTO;
import com.project2.repository.TenantRepository;
import com.project2.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MotelRoomConvert implements Convert<MotelRoom, MotelRoomDTO> {

    private final ReportService reportService;

    private final TenantRepository tenantRepository;

    @Override
    public MotelRoomDTO toDTO(MotelRoom motelRoom, String email) throws Exception {
        Integer personIn = Math.toIntExact(tenantRepository.count(Example.of(Tenant.builder()
                .room(motelRoom).status(true).build())));

        List<Report> reports = reportService.findAllByRoom(motelRoom.getId(), email);
        List<Integer> rates = new ArrayList<>();
        Float ratings = 0F;
        for (Report r : reports) {
            if (!rates.contains(r.getIdCmt()))
                rates.add(r.getIdCmt());
            ratings += r.getRate();
        }

        return MotelRoomDTO.builder()
                .motelRoom(motelRoom)
                .tenantList(tenantRepository.findAllByRoomAndDeletedFalse(motelRoom))
                .personIn(personIn)
                .personAsk(Math.toIntExact(tenantRepository.count(Example.of(Tenant.builder()
                        .room(motelRoom).status(false).build()))))
                .reportList(reportService.findAllByRoom(motelRoom.getId(), email))
                .countReport(reports.size())
                .countRated(rates.isEmpty() ? 0 : rates.size())
                .ratings(ratings.equals(0F) ? 0F : (ratings / rates.size()))
                .build();
    }
}
